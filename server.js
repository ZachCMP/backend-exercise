const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const config = require('./config')

const api = require('./api')(config.PG_CONFIG)

const app = express()
const port = config.APP_PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
app.get('/stations', async (req, res) => {
  const { bbox } = req.query
  if (bbox) {
    try {
      const [ swln, swlat, neln, nelat ] = bbox.split(',').map(e => parseFloat(e.trim()))
      const stations = await api.getStationsForBbox({
        lat: {
          min: swlat,
          max: nelat
        },
        lon: {
          min: swln,
          max: neln,
        }
      })
      return res.send(stations || [])
    } catch(err) {
      return res.status(500).send(err.message)
    }
  }
  return res.status(400).send('"bbox" is required')
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'static/index.html')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))