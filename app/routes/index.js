var express = require('express');
var router = express.Router();
let setLevel = global.setLevel;
let {Role,Role_ch:ROLE} = require('../config');

/* GET home page. */
router.get('/', setLevel(1),function (req, res, next) {
    let params = {
        title: 'Express',
        username: req.session.username || '',
        role: ""
    };

    //判断用户身份
    global.acl.userRoles(req.session.userID, (err, role) => {
        if (role.length > 0 ) {
            if( role.indexOf(Role[3]) !== -1){      //管理员
                params.role = ROLE[3];
            }else if( role.indexOf(Role[2]) !== -1){     //超级会员
                params.role = ROLE[2];
            }else if(role.indexOf( Role[1]) !== -1){    //普通会员
                params.role = ROLE[1];
            }
        }else {
            params.role = null;
        }
        res.render('index', params);
    });



});

router.get('/menu',setLevel(1), function (req, res, next) {

    let db =
        [{
            title: "功能一",
            list: [{"name": "功能一", "ind": "xxxxxx", "route": "/menu1"}],

        }, {
            title: '功能二',
            list: [{"name": "功能二", "ind": "xxxxx", "route": "/menu2"}]
        }];
    global.acl.userRoles(req.session.userID)
        .then((role) => {

            //如果是管理员 增加用户管理功能
            if (role.length > 0 && role.indexOf(Role[3]) !== -1) {
                db.push({
                    title:"系统管理",
                    list: [
                        {"name": "用户管理", "ind": "用户信息列表", "route": "/user"},
                        {"name": "权限管理", "ind": "权限管理列表", "route": "/permission"}
                    ]
                });
            }

            res.json({'data': db});
        });

});

router.get('/err', setLevel(0), function (req, res, next) {
    res.render('404.html');
});

module.exports = router;