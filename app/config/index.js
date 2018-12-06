/**
 * @author wbding
 * @date 2018/11/2.
 * @description
 */
const path = require("path");
module.exports = {
    "postgres": {
        "host": "127.0.0.1",
        "port": 5432,
        "user": "postgres",
        "password": 123456,
        "database": "CRMTEST",
        "schema": "warlock",
        "dialect": "postgres"
    },
    "redis": {
        "host": "127.0.0.1",
        "port": "6379",
        "db": 4,
    }
    ,
    "logger": {
        "filename": path.join(__dirname, "../log/access.log"),
        "level": 3
    },
    "redis_prefix": "acl_test:",
    "session_prefix": "user1:",
    "maxAge": 15 * 24 * 60 * 60 * 1000,  //session有效期15天
    "Role": ['guest', 'member', 'superMember', 'admin'],
    "Role_ch": ['游客', '普通会员', '超级会员', '管理员'],
};