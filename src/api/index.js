const express = require('express')
const router = express.Router()

const auth = require('./authController')
const cursos = require('./cursos')

router.get('/', (req, res) => {
  res.send('ok')
})

router.use('/auth', auth)
router.use('/cursos', cursos)

module.exports = router