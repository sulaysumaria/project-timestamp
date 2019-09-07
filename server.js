// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const PORT = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors()); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:dateString?', (req, res) => {
  let {dateString = ''} = req.params;

  let status = 500;
  let response = {message: 'Internal Server Error'};

  if (!dateString) {
    dateString = new Date();
    status = 200;
    response = {unix: dateString.getTime(), utc: dateString.toUTCString()};
  } else {
    dateString = dateString.split('-');

    if (!dateString.length) {
      dateString = new Date();
      status = 200;
      response = {unix: dateString.getTime(), utc: dateString.toUTCString()};
    } else if (dateString.length === 1) {
      dateString = new Date(parseInt(dateString[0], 10));
      status = 200;
      response = {unix: dateString.getTime(), utc: dateString.toUTCString()};
    } else if (dateString.length === 3) {
      dateString = new Date(dateString.join('-'));
      status = 200;
      response = {unix: dateString.getTime(), utc: dateString.toUTCString()};
    } else {
      status = 400;
      response.message = 'Date might be in invalid format.';
    }
  }

  return res.status(status).send(response);
});

// listen for requests :)
app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});

// export app :)
module.exports = {
  app,
};
