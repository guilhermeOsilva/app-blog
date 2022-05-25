const Sequelize = require('sequelize');

const connection = new Sequelize('appblog','root','password',{
    host:'localhost',
    dialect: 'mysql'
})


module.exports = connection;
