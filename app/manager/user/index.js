/**
 * @author wbding
 * @date 2018/10/17.
 * @description
 */
const DataBase = require("../../sequelize/");
const user = DataBase.model("user");

const moment = require('moment');
class User {

    static findAll(searchCond = {}, isFuzzy = false){

        let { username = "", email = "",role = "", updatedAt = {}, page = 0, limit = 100 } = searchCond;
        let where = {}, orList = [];

        if (isFuzzy) {
            if (typeof username === "string" && username !== "") orList.push({
                username: {
                    $like: username
                }
            });
            if (typeof email === "string" && email !== "") orList.push({
                email: {
                    $like: email
                }
            });
        }
        else {
            if (typeof username === "string" && username !== "") where["username"] = username;
            if (typeof email === "string" && email !== "") where["email"] = email;
        }
        if (Object.keys(updatedAt).length > 0) {
            let { startDate, endDate } = updatedAt;
            where["updatedAt"] = {
                $between: [new Date(startDate), new Date(endDate)]
            };
        }
        if (orList.length > 0) where['$or'] = orList;

        return user.findAndCountAll({
            attributes:['id','username','password','email','role'],
            limit,
            where,
            offset: page,
            order: [
                ['updatedAt', 'DESC']
            ],
        }).then(({ count, rows }) => {
            rows = rows.map(row => {
                row = row.toJSON();
                row.updatedAt = moment(row.updatedAt).format("YYYY-MM-DD HH:mm");
                return row;
            });
            return { "data": rows, "recordsFiltered": count, "recordsTotal": count };
        });
    }

    static findOne(options){
        return user.findOne(options);
    }

    static update(values,options){
        return  user.update(values,options)
    }


    static delete(options){
        return user.destroy(options)
    }

    static add(values){
        return user.create(values)
    }

};
module.exports =  User;
