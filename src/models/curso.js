const { v4: uuid } = require('uuid')

const curso = (sequelize, DataTypes) => {
  const Curso = sequelize.define('Curso', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING
    },
    ch: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'curso',
    hooks: {
      beforeValidate: (curso, options) => {
        curso.id = uuid();
      },
    }
  })

  return Curso
}

module.exports = curso