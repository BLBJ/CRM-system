/**
 * @author wbding
 * @date 2018/10/16.
 * @description
 */
module.exports = (postgres, DataTypes) => {
    postgres.define('user',
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            username: { type: DataTypes.STRING, allowNull: false, comment: '用户名' },
            password: { type: DataTypes.STRING, allowNull: false, comment: '密码' },
            email: { type: DataTypes.STRING, allowNull: false, comment: '邮箱' },
            role: { type: DataTypes.STRING, allowNull: false, comment: '角色' },
            userID: { type: DataTypes.STRING, allowNull: false, comment: '用户ID' },
        },
        {
            indexes: [{ fields: ['username', 'password', 'email'] }],
            paranoid: true,
            version: "version",
            tableName: "user"
        }
    )
}