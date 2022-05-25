const Sequelize = require('sequelize');

const connection = new Sequelize('appblog','root','password',{
    host:'localhost',
    dialect: 'mysql',
    timezone: "-03:00",
})


module.exports = connection;
