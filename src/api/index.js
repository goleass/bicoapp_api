const express = require('express')
const router = express.Router()

const auth = require('./authController')

const user = require('./userController')
const cursos = require('./cursos')
const skill = require('./skillController')

router.get('/', (req, res) => {
  res.send('ok')
})

router.use('/user', user)
router.use('/auth', auth)
router.use('/cursos', cursos)

router.use('/skill', skill)

module.exports = router