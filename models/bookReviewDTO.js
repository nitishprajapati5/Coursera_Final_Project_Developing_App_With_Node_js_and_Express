const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconnection.js'); // Note the use of sequelize.sequelize


//Require Models for Using Primary key and Foreign Key
const user = require('./userDTO.js')
const book = require('./booksDTO.js')

const bookReviewDTO = sequelize.define('Review',{
    review_text:{
        type : DataTypes.STRING,
        allowNull:false
    }
});


user.belongsToMany(book,{through : bookReviewDTO})
book.belongsToMany(user, { through : bookReviewDTO });

module.exports = bookReviewDTO;