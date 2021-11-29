class SkillService {
  constructor(SkillModel) {
    this.Skill = SkillModel
  }

  async get() {
    try {
      const skills = await this.Skill.findAll()
      return skills
    } catch (error) {
      throw error
    }
  }

  async add(DTO) {
    try {
      const skill = await this.Skill.create(DTO)
      return skill
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const skill = await this.Skill.findOne({ where: params })
      return skill
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const skill = await this.Skill.destroy({ where: params })
      return skill
    } catch (error) {
      throw error
    }
  }

  async findAll(params, include = null) {
    try {
      const skill = await this.Skill.findAll({ where: params, include })

      return skill
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const skill = await this.Skill.update(
        { ...data },
        { where: params }
      )

      console.error(skill)

      const newSkill = this.findOne(params)

      return newSkill
    } catch (error) {
      throw error
    }
  }
}

module.exports = SkillService