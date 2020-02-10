const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')

const api = require('./api')(config.PG_CONFIG)

const app = express()
const port = config.APP_PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/init', async (req, res) => {
  try {
    return res.send(await api.init())
  } catch(err) {
    return res.status(500).send({
      ok: false,
      error: err
    })
  }
})
app.get('/test', async (req, res) => res.send(await api.test()))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))