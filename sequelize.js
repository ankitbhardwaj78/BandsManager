const Sequelize = require('sequelize')
const sequelize = new Sequelize('BandsManager', 'ankit', '123456', {
  dialect: 'sqlite',
  storage: './db.sqlite3'
})


module.exports = sequelize