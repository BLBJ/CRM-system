var express = require('express');
var router = express.Router();
let user = require('../manager/user/index');
let uuid = require('uuid');
let setLevel = global.setLevel;



router.route('/user')
//获取
    .get(setLevel(3),function (req, res) {
        let {searchCond = '{}', isFuzzy = false} = req.query;
        try {
            searchCond = JSON.parse(searchCond);
        }
        catch (e) {
            return res.json({code: '3001', msg: '参数异常'});
        }
        if (isFuzzy === "true") isFuzzy = true;
        user.findAll(searchCond, isFuzzy)
            .then(rows => {
                res.json({
                    data: rows
                });
            })
            .catch(err => {
                res.json({
                    code: "2001",
                    msg: err.message
                });
            })
    })
    //修改
    .post(setLevel(3),function (req, res) {
        let {searchCond = {}} = req.body;
        try {
            searchCond = JSON.parse(JSON.stringify(searchCond));
        }
        catch (e) {
            return res.json({code: '3001', msg: '参数异常'});
        }

        let {value = {}, where = {}} = searchCond;

        //数据库修改
        user.update(value, {where})
            .then((data) => {
                res.json({code: '200', msg: '修改成功'});
            }).catch((err) => {
            console.error(err);
        });
    })
    //删除
    .delete(setLevel(3),function (req, res) {
        let {searchCond = {}} = req.body;
        try {
            searchCond = JSON.parse(JSON.stringify(searchCond));
        }
        catch (e) {
            return res.json({code: '3001', msg: '参数异常'});
        }

        let where = searchCond;

        user.delete({
            where,
            force: false  //设置 deletedAt 为当前时间戳  不删除数据
        }).then((data) => {
            res.json({code: '200', msg: '删除成功'});
        }).catch((err) => {
            console.error(err);
        });
    })
    //添加
    .put(setLevel(3),function (req, res) {
        let {searchCond = {}} = req.body;
        try {
            searchCond = JSON.parse(JSON.stringify(searchCond));
        }
        catch (e) {
            return res.json({code: '3001', msg: '参数异常'});
        }
        searchCond.userID = uuid().replace(/-/g, '');
        user.add(searchCond)
            .then((data) => {
                res.json({code: '200', msg: '添加成功'});
            }).catch((err) => {
            console.error(err);
        });
    });


module.exports = router;


