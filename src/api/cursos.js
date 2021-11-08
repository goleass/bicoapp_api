const express = require('express')

const router = express.Router()
const { curso } = require('../models')
const CursoService = require('../services/cursos')

const cursoService = new CursoService(curso)

router.get('/', async (req, res) => {
  try {
    const cursos = await cursoService.get()
    res.json(cursos)
  } catch (error) {
    console.error(error)
    res.status(400)
  }
})

module.exports = router