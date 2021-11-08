class CursoService {
  constructor(CursoModel){
    this.curso = CursoModel
  }

  async get() {
    const cursos = await this.curso.findAll()

    return cursos
  }

  async add(DTO) {
    try {
      await this.curso.create(DTO)
    } catch (error) {
      throw error
    }
  }
}

module.exports = CursoService