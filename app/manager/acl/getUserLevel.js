/**
 * @author wbding
 * @date 2018/11/9.
 * @description
 */
module.exports = function (userID, cb) {
    acl.userRoles(userID, function (err, roles) {
       if(Object.prototype.toString.call(roles) === "[object Array]" && roles.length>0){
        if (roles.indexOf('admin') !== -1) {
            cb(null, 3);
        } else if (roles.indexOf('superMember') !== -1) {
            cb(null, 2);
        } else if (roles.indexOf('member') !== -1) {
            cb(null, 1);
        } else if (roles.indexOf('guest') !== -1) {
            cb(null, 0);
        } else {
            cb({msg:'用户角色非法'});
        }
       }else {
           cb({msg: '未获取用户身份角色'});
       }
    })
}