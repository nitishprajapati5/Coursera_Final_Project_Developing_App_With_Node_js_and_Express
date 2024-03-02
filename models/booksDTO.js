const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbconnection'); // Note the use of sequelize.sequelize

const book = sequelize.define('Book',{
    ISBN : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    title : {
        type:DataTypes.STRING,
        allowNull:false
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
    {
        freezeTableName:true,
        tablename:"Book"
    }
);


// book.sync({alter:constants.ALTER_REGISTER})
// .then(() => {
//     console.log('Register table synced successfully with Register Changes with flag set as ' + constants.ALTER_REGISTER);
// })
// .catch((error) => {
//     console.error('Error syncing Register table:', error);
// });

// book.sync({force:true})
// .then(() => {
//     console.log('Register table synced successfully with force change and flag set as ' + constants.FORCE_SYNC_REGISTER);
// })
// .catch((error) => {
//     console.error('Error syncing Register table:', error);
// });
module.exports = book;