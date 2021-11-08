const express = require('express')
const cors = require('cors')
const routers = require('./api')
const { sequelize } = require('./models')

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', routers)

sequelize.sync().then(() => {
  console.log('Conectado com o banco de dados.')
})

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`)
})