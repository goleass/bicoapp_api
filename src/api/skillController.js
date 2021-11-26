const express = require('express')
const { v4: uuid } = require('uuid')
const router = express.Router()
const { Skill, User } = require('../models')
const skillService = require('../services/Skill')
const userService = require('../services/User')

const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware);

const SkillService = new skillService(Skill)
const UserService = new userService(User)

router.get('/', async (req, res) => {
  try {
    let data = req.query

    let skills = []

    if (data.email) {
      const { id: id_user } = await UserService.findOne({ email: data.email.toLowerCase() })
      data = { id_user }
      skills = await SkillService.findAll(data)
    } else {
      const user_id = req.user_id
      skills = await SkillService.findAll(data, User)
      skills = skills.filter(skill => skill.id_user != user_id)
    }

    if (skills.length == 0)
      return res.status(200).send({ error: "Nenhuma skill foi encontrada." })

    return res.send(skills)
  }
  catch (error) {
    res.status(400).send({ error: "Falha ao encontrar skills." })
  }
})
router.get('/all', async (req, res) => {
  try {
    const skills = await SkillService.findAll(null, User) || []

    if (skills.length == 0)
      return res.status(200).send({ error: "Nenhuma skill foi encontrada." })

    return res.send(skills)
  }
  catch (error) {
    res.status(400).send({ error: "Falha ao encontrar skills." })
  }
})

router.post('/new-skill', async (req, res) => {
  try {
    const { email } = req.body
    const { id: id_user } = await UserService.findOne({ email: email.toLowerCase() })

    if (!id_user)
      return res.status(200).send({ error: "Usuário não foi encontrado." })

    const notEmail = ({ email, ...rest }) => rest;

    const data = {
      id: uuid(),
      ...notEmail(req.body),
      title: req.body.title.toLowerCase(),
      id_user
    }

    const skill = await SkillService.add(data)

    return res.send(skill)
  }
  catch (error) {
    res.status(400).send({ error: "Falha ao inserir nova skill." })
  }
})

module.exports = router