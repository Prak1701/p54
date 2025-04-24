let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// Always connect to the Docker container's MongoDB service
let mongoUrl = "mongodb://admin:password@mongodb:27017";

// MongoDB connection options
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Database name
let databaseName = "my-db";

// Update user profile
app.post('/update-profile', function (req, res) {
  let userObj = req.body;

  MongoClient.connect(mongoUrl, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, result) {
      if (err) throw err;
      client.close();
    });
  });

  // Send response
  res.send(userObj);
});

// Get user profile
app.get('/get-profile', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrl, mongoClientOptions, function (err, client) {
    if (err) throw err;

    let db = client.db(databaseName);

    let myquery = { userid: 1 };

    db.collection("users").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      // Send response
      res.send(response ? response : {});
    });
  });
});

// Listen on port 3000
app.listen(3000, function () {
  console.log("app listening on port 3000!");
});