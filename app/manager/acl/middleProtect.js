/**
 * @author wbding
 * @date 2018/10/17.
 * @description
 */

let uuid = require('uuid');
let {Role} = require('../../config');

function middleProtect(req, res, next, level = 0) {
    let resource = req.path;
    let method = req.method.toLowerCase();

    //1.该请求是否已经设置允许访问的角色
    new Promise((down) => {
        acl.areAnyRolesAllowed(Role, resource, method, function (err, allowed) {
            if (allowed) {
                down();
            } else {
                acl.allow(Role[level], resource, method).then(() => {
                    down();
                });

            }
        });
    })
    //是否存在userID
        .then(() => {
            return new Promise(down => {
                if (!req.session.userID) {
                    req.session.userID = uuid().replace(/-/g, '');
                    global.acl.addUserRoles(req.session.userID, Role[0], (err) => {
                        if (err) console.error(err);
                        down();
                    })

                }
                else {
                    // down();
                    global.acl.addUserRoles(req.session.userID, Role[0], (err) => {
                        if (err) console.error(err);
                        down();
                    })
                }
            })
        })
        //该userID是否允许访问该请求
        .then(() => {
            acl.isAllowed(req.session.userID, resource, method, function (err, isAllow) {
                if (isAllow) {
                    next();
                } else {
                    res.redirect('/login');
                }
            })
        })
        .catch(err => {
            res.json({
                code: "2001",
                msg: err.message
            });
        })
}

let setLevel = (level) => {
    return function (req, res, next) {
        middleProtect(req, res, next, level);
    }
};

module.exports = setLevel;
