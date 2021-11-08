const sequelize = require('../config/sequelize')

const Sequelize = require('sequelize')

const user = require('./User')

const User = user(sequelize, Sequelize.DataTypes)

const db = {
  User,
  sequelize
}

module.exports = db