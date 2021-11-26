const sequelize = require('../config/sequelize')

const Sequelize = require('sequelize')

const user = require('./User')
const skill = require('./Skill')

const User = user(sequelize, Sequelize.DataTypes)
const Skill = skill(sequelize, Sequelize.DataTypes)

Skill.belongsTo(User, {
  constraint: true,
  foreignKey: 'id_user'
})

const db = {
  User,
  Skill,
  sequelize
}

module.exports = db