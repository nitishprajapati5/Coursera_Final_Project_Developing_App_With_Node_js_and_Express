const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mssql'
    }
);

async function connectDatabase() {
    try {
        const connectedDatabase = await sequelize.sync();
        console.log("Connected Database");
    } catch (error) {
        console.log("Failed to Connect to Database", {
            message: error.message
        });
    }
}

module.exports = {
    sequelize, // Exporting the Sequelize instance
    connectDatabase
};
