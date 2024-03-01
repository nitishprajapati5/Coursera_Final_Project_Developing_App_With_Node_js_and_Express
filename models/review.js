const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconnection'); // Note the use of sequelize.sequelize


//Require Models for Using Primary key and Foreign Key
const user = require('./user.js')
const book = require('./book.js')

const review = sequelize.define('Review',{
    review_text:{
        type : DataTypes.STRING,
        allowNull:false
    }
});

user.belongsToMany(book,{through : review})
book.belongsToMany(user, { through : review });

module.exports = review;