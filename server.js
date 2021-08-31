// load enviroment variables from .env file
require('dotenv').config()

const path = require('path')
const axios = require('axios')
const express = require('express')
const favicon = require('serve-favicon')
const cors = require('cors')
const RateLimit = require('express-rate-limit')

const app = express()

app.use(cors())
app.use(favicon(path.join(process.cwd(), 'favicon.ico')))

app.set('port', process.env.PORT || 3000)
app.set('trust proxy', 1)

// https://www.npmjs.com/package/express-rate-limit
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1,
  handler: function (req, res) {
    const { rateLimit : { resetTime } } = req
    res.status(429).json({
      resetTime
    })

    // https://day.js.org/docs/en/display/difference
    // on frontend you may wanna show a message like 'try again in N minutes'
  },
})

app.get('/', (_, res) => {
  res.send(`<span style="font-family: system-ui;">Have a nice time coding😎</span>`)
})

app.get('/api/forecast', limiter, async (req, res) => {

  const params = {
    access_key: process.env.API_KEY,
    query: req.query.coords,
  }

  try {
    const { rateLimit: { resetTime } } = req
    const { data : { location, current: forecast } } = await axios.get('http://api.weatherstack.com/current', { params })
    return res.send({ location, forecast, resetTime })

  } catch (e) {
    res.send(e)
  }
})

app.listen(
  app.get('port'),
  () => console.log(`Server is listening at port ${app.get('port')}`)
)
