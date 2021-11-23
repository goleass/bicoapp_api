class UserService {
  constructor(UserModel) {
    this.User = UserModel
  }

  async get() {
    try {
      const users = await this.User.findAll()
      return users
    } catch (error) {
      throw error
    }
  }

  async add(DTO) {
    try {
      const user = await this.User.create(DTO)
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async findOne(params) {
    try {
      const user = await this.User.findOne({ where: params })
      return user
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const user = await this.User.update(
        { ...data },
        { where: params }
      )

      const newUser = this.findOne(params)

      return newUser
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserService