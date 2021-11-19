module.exports = {
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: 5432,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD
}