var express = require('express');
var router = express.Router();
let user = require('../manager/user');
let uuid = require('uuid');
let setLevel = global.setLevel;
let {Role, ROLE} = require('../config');
const soap = require('soap');

/* 登录页面 */
router.get('/login', setLevel(0), function (req, res, next) {
    res.render('login', {title: '登录界面'});
});

/* 注册页面 */
router.get('/register', setLevel(0), function (req, res, next) {
    res.render('register', {title: '用户注册'});
});

router.post('/user/login', setLevel(0), function (req, res, next) {
    let {searchCond = '{}'} = req.body;
    try {
        searchCond = JSON.parse(searchCond);
    }
    catch (e) {
        return res.json({code: '3001', msg: '参数异常'});
    }

    let {username = "", password = "", code = ""} = searchCond;

    user.findOne({
        where: {
            username
        }
    })
    //验证用户名
        .then(function (project) {
            return new Promise(down => {
                if (project !== null) {
                    down(project);
                } else {
                    res.json({
                        code: "3001",
                        msg: '该用户不存在'
                    });
                }
            })
        })
        //验证密码
        .then((project) => {
            req.session.userID = project.dataValues.userID;
            req.session.username = project.dataValues.username;
            let password_db = project.dataValues.password;
            return new Promise(down => {
                if (password === password_db) {
                    down(project);
                }
                else {
                    res.json({
                        code: "3001",
                        msg: '密码错误'
                    });
                }
            })
        })
        //指定身份
        .then(project => {
            global.acl.userRoles(req.session.userID)
                .then((roles) => {
                    return new Promise((down) => {
                        if (roles.length > 0) {
                            global.acl.removeUserRoles(req.session.userID, roles)
                                .then(() => down());
                        } else {
                            down();
                        }
                    })
                })
                .then(() => {
                    global.acl.addUserRoles(req.session.userID, JSON.parse(project.dataValues.role))
                        .then(() => {
                            res.json({
                                code: "200",
                                msg: '登陆成功'
                            });
                        })
                        .catch(err => {
                            res.json({
                                code: "2001",
                                msg: err.message
                            });
                        })
                })
                .catch(err => {
                    res.json({
                        code: "2001",
                        msg: err.message
                    });
                })
        })
        .catch(err => {
            res.json({
                code: "2001",
                msg: err.message
            });
        })
});

router.post('/user/register', setLevel(0), function (req, res, next) {
    let {searchCond = '{}'} = req.body;
    try {
        searchCond = JSON.parse(searchCond);
    }
    catch (e) {
        return res.json({code: '3001', msg: '参数异常'});
    }

    let {username = "", password = "", email = ""} = searchCond;

    //用户名是否存在
    user.findOne({
        where: {
            username
        }
    }).then((project) => {
        return new Promise((down) => {
            if (project !== null) {
                res.json({
                    msg: '用户名已存在',
                    code: '3001'
                });
            } else {
                down();
            }
        })
    }).then(() => {
            return new Promise((down) => {
                user.findOne({
                    where: {
                        email
                    }
                }).then((project) => {
                    if (project !== null) {
                        res.json({
                            msg: '该邮箱已被注册',
                            code: '3001'
                        });
                    } else {
                        down();
                    }
                })
            })
        })
        .then(() => {
            user.add({
                username,
                password,
                email,
                userID: uuid().replace(/-/g, ''),
                role: JSON.stringify([Role[0], Role[1]])
            })
                .then((project) => {
                    req.session.userID = project.dataValues.userID || "";
                    global.acl.addUserRoles(req.session.userID, Role[1])
                        .then(() => {
                            res.json({
                                msg: '注册成功',
                                code: '200'
                            });
                        })
                })
                .catch(err => {
                    res.json({
                        code: "2001",
                        msg: err.message
                    });
                })
        }).catch(err => {
        res.json({
            code: "2001",
            msg: err.message
        });
    })


});

module.exports = router;

