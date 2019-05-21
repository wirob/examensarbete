import bodyParser from 'body-parser'
import express from 'express'
import { routes } from './routes/routes'
import sequelize from './sequelize'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3001

app.use('/api', routes)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')

    // Launches the application
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err)
  })
