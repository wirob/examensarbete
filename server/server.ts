import bodyParser from 'body-parser'
import express from 'express'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
