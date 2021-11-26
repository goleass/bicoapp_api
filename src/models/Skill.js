const Skill = (sequelize, DataTypes) => {
  const skill = sequelize.define('Skill', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type_experience: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
    {
      tableName: 'skill'
    })

  return skill
}

module.exports = Skill