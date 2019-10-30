
var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

var tableData = require("tableData.js");
var waitData = require("waitData.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var table = [
  {
    name: "Steve",
    phoneNumber: "804-555-4455",
    email: "steve@stuff.com",
    id: 20
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
    // return res.json(table)
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

app.post("/api/reserve", function(req, res) {
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

//tableData
//waitData
app.post("/api/tables", function(req, res) {
 
  if (tableData.length < 5) {
    tableData.push(req.body);
    console.log("Reservation successful!");
  }
  else {
    waitData.push(req.body);
    console.log("Entry has been waitlisted!");
  }
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
