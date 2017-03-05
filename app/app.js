var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/api/vendor', function (req, res) {
  console.log(req.body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify({
    success: true
  }))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
