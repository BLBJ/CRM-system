/**
 * @author wbding
 * @date 2018/10/24.
 * @description
 */
var express = require('express');
var router = express.Router();
let {Role, Role_ch: ROLE} = require('../config');

router.route('/permission')
    .get(setLevel(3), function (req, res, next) {
        let getSource = (index) => {
            return new Promise((down) => {
                global.acl.whatResources(Role[index])
                    .then(data => {
                        down({
                            role: Role[index],
                            // permission: JSON.stringify(Object.keys(data))
                            permission: JSON.stringify(data)
                        });
                    })
            })
        };

        let stack = Role.map((item, index) => {
            return getSource(index);
        });

        Promise.all(stack).then((result) => {
            res.json({data:{"data": result,"recordsFiltered": result.length, "recordsTotal": result.length}});
        }).catch(err => {
            res.json({
                code: "2001",
                msg: err.message
            });
        })

    })
    .put(setLevel(3), function (req, res, next) {
        let {searchCond = {}} = req.body;
        try {
            searchCond = JSON.parse(JSON.stringify(searchCond));
        }
        catch (e) {
            return res.json({code: '3001', msg: '参数异常'});
        }
        let {role = "", resource = "", http = ""} = searchCond;

        global.acl.allow(role, resource, http)
            .then(() => {
                res.json({
                    code: 200,
                    msg: '新增成功'
                })
            }).catch(err => {
            res.json({
                code: "2001",
                msg: err.message
            });
        })
    })
    .delete(setLevel(3), function (req, res, next) {
        let {searchCond = {}} = req.body;
        try {
            searchCond = JSON.parse(JSON.stringify(searchCond));
        }
        catch (e) {
            return res.json({code: '3001', msg: '参数异常'});
        }
        let {role = "", resource = "", http = ""} = searchCond;

        global.acl.removeAllow(role, resource, http)
            .then(() => {
                res.json({
                    code: 200,
                    msg: '删除成功'
                })
            }).catch(err => {
            res.json({
                code: "2001",
                msg: err.message
            });
        })

    })
module.exports = router;


