import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  host: 'localhost',
  storage: './db.sqlite'
})

export default sequelize
