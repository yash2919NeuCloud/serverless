const { Sequelize } = require('sequelize');
require('dotenv').config();

    console.log('DB_DATABASE', process.env.DB_DATABASE)
    const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
      dialect: 'mysql',
      host: process.env.DB_HOST,
    });


module.exports = { sequelize };
