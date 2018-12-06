const DataBase = require("../sequelize/");


//创建数据库
DataBase.sync({ force: true }).then(() => {
    DataBase.model("user");
});