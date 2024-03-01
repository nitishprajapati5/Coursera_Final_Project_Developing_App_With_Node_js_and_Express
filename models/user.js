const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconnection'); // Note the use of sequelize.sequelize

const User = sequelize.define('User', {
    Id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
