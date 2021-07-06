var express = require('express');
var app = express();


var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api", function(req,res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})



app.get("/api/:date", function (req, res) {

const date = new Date(req.params.date);

if(date.toString() === 'Invalid Date') {

  const millTime  = Number(req.params.date);
  if(!isNaN(millTime)) {
    res.json({
      unix: millTime,
      utc: new Date(millTime).toUTCString()
    });
  }
  
  else {
    res.json({
      error: "Invalid Date"
    });

  }
}

else {
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
}

});
  


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
