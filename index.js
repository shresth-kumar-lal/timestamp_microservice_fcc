// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  if (dateParam) {
    let date;
    // Check if the dateParam is a numeric string
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam)); // Treat as a Unix timestamp
    } else {
      date = new Date(dateParam); // Treat as a regular date string
    }

    if (isNaN(date.getTime())) {
      res.json({ error: 'Invalid Date' });
    } else {
      const unixTimestamp = date.getTime();
      const utcString = date.toUTCString();

      res.json({ unix: unixTimestamp, utc: utcString });
    }
  } else {
    const currentDate = new Date();
    const unixTimestamp = currentDate.getTime();
    const utcString = currentDate.toUTCString();

    res.json({ unix: unixTimestamp, utc: utcString });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
