const bcrypt = require('bcryptjs')
const { v4: uuid } = require('uuid')

const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      tableName: 'user',
      hooks: {
        beforeValidate: async (user, options) => {
          const hash = await bcrypt.hash(user.password, 10)
          user.password = hash;
          user.id = uuid();
        },
      }
    })

  return user
}

module.exports = User