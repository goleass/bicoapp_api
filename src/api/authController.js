const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json')
const router = express.Router()
const { User } = require('../models')
const userService = require('../services/User')

const UserService = new userService(User)

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

router.post('/register', async (req, res) => {
  const { email } = req.body

  if(!email)
    res.status(400).send({ error: "Os campos não foram preenchidos corretamente." })

  try {
    if (await UserService.findOne({ email }))
      return res.status(400).send({ error: "Usuário já existe." })

    const user = await UserService.add(req.body)

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

  const user = await UserService.findOne({ email })

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

module.exports = router