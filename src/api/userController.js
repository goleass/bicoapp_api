const express = require('express')
const router = express.Router()
const { User } = require('../models')
const userService = require('../services/User')

const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware);

const UserService = new userService(User)

router.get('/', async (req, res) => {

  try {
    const user = await UserService.findOne({ ...req.query })

    if (!user)
      return res.status(200).send({ error: "Usuário não foi encontrado." })

    user.password = undefined

    return res.send(user)
  }
  catch (error) {
    res.status(400).send({ error: "Falha ao procurar usuario." })
  }
})

router.put('/update', async (req, res) => {
  const { email } = req.body

  const notEmail = ({ email, ...rest }) => rest;

  if (!email)
    res.status(200).send({ error: "Os campos não foram preenchidos corretamente." })

  try {
    const user = await UserService.findOne({ email: email.toLowerCase() })

    if (!user)
      return res.status(200).send({ error: "Usuário não foi encontrado." })

    const data = {
      ...notEmail(req.body),
    }

    const userUpdated = await UserService.update({ id: user.dataValues.id }, data)

    userUpdated.password = undefined

    return res.send(userUpdated)
  }
  catch (error) {
    res.status(400).send({ error: "Falha ao atualizar usuário." })
  }
})

module.exports = router