const Sequelize = require('sequelize');
const { host, port, user, password = '', database, schema = '', dialect } = require("../config").postgres;
const logger = require("../utils/logger");

let DataBase = new Sequelize(database, user, password, {
    host,
    port,
    schema,
    dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

require("./module/user")(DataBase,Sequelize.DataTypes);

DataBase.sync().then(() => {
    logger.info("数据库连接成功！");
});

module.exports = DataBase;