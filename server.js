// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

const PORT = 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors')
app.use(cors()) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' })
})

app.get('/api/timestamp/:date_string', (req, res) => {
  let { date_string = '' } = req.params

  let status = 500
  let response = { message: 'Internal Server Error' }

  date_string = date_string.split('-')

  console.log({ date_string })
  if (!date_string.length) {
    date_string = new Date()
    status = 200
    response = { unix: date_string.getTime(), utc: date_string.toUTCString() }
  } else if (date_string.length === 1) {
    date_string = new Date(parseInt(date_string[0], 10))
    status = 200
    response = { unix: date_string.getTime(), utc: date_string.toUTCString() }
  } else if (date_string.length === 3) {
    date_string = new Date(date_string.join('-'))
    status = 200
    response = { unix: date_string.getTime(), utc: date_string.toUTCString() }
  } else {
    status = 400
    response.message = 'Date might be in invalid format.'
  }
  return res.status(status).send(response)
})

// listen for requests :)
app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT)
})

// export app :)
module.exports = { app }
