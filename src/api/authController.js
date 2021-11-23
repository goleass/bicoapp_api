const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid')

const router = express.Router()
const { User } = require('../models')
const userService = require('../services/User')

const UserService = new userService(User)

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET, {
    expiresIn: 86400,
  })
}

router.post('/register', async (req, res) => {
  const { email } = req.body

  if (!email)
    res.status(200).send({ error: "Os campos não foram preenchidos corretamente." })

  try {
    if (await UserService.findOne({ email: email.toLowerCase() }))
      return res.status(200).send({ error: "Usuário já existe." })

    const hash = await bcrypt.hash(req.body.password, 10)

    password = hash;
    id = uuid();

    const data = {
      id,
      first_name: req.body.first_name.toLowerCase(),
      last_name: req.body.last_name.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password
    }

    const user = await UserService.add(data)

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id })
    })
  }
  catch (error) {
    res.status(400).send({ error: "Falha ao registrar usuário." })
  }
})

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body

  const user = await UserService.findOne({ email: email.toLowerCase() })

  if (!user)
    return res.status(401).json({ error: "Usuário ou senha inválidos." })

  if (!await bcrypt.compare(password, user.password))
    return res.status(401).json({ error: "Usuário ou senha inválidos." })

  user.password = undefined

  return res.send({
    user,
    token: generateToken({ id: user.id })
  });
})

router.put('/update-password', async (req, res) => {
  const { email } = req.body

  const notEmail = ({ email, ...rest }) => rest;

  if (!email)
    res.status(200).send({ error: "Os campos não foram preenchidos corretamente." })

  try {
    const user = await UserService.findOne({ email: email.toLowerCase() })

    if (!user)
      return res.status(200).send({ error: "Usuário não foi encontrado." })

    const password = await bcrypt.hash(req.body.password, 10)

    const data = {
      ...notEmail(req.body),
      password
    }

    const userUpdated = await UserService.update({ id: user.dataValues.id }, data)

    userUpdated.password = undefined

    return res.send(userUpdated)
  }
  catch (error) {
    res.status(400).send({ error: "Falha ao atualizar senha de usuário." })
  }
})

module.exports = router