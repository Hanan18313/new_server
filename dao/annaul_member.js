'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Annual', {
        id:{type:DataTypes.INTEGER(11), autoIncrement:true, primaryKey : true, unique : true},
        name: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.INTEGER
        },
        unionid:{
            type:DataTypes.STRING
        },
        portrait:{
            type:DataTypes.STRING
        },
        signIn_time:{
            type:DataTypes.DATETIME
        }
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        tableName: 'annual',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}
