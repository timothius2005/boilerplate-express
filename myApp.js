let express = require('express');
let bodyParser = require('body-parser');
let app = express(); 

//Section 6
app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//Section 2
app.use("/public", express.static(__dirname + "/public"));

//Section 1
console.log("Hello World");

//Section 3
app.get("/", (req, res) => {
    res.sendfile(__dirname + "/views/index.html");
  });

//Section 4
app.get("/json", (req,res) => {
  if (process.env.MESSAGE_STYLE=== "uppercase") {
    res.json({  
      "message": "HELLO JSON"
    });
  }  else {
    res.json ({
      "message": "Hello json"
    });
  }
});

//Section 8
app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({
    time: req.time
  });
});

//section 9
app.get("/:word/echo",(req, res) =>{
const { word } = req.params;
  res.json({
    echo: word
  });
});

//section 10
app.get("/name", (req, res) =>{
  //create variables for FName and Lname
var firstname = req.query.first;
var lastname = req.query.last;
//use template literals to form a formatted string
  res.json({
    name: `${firstname} ${lastname}`
  });
});

//section 11
app.use(bodyParser.urlencoded({extended:false}));

//section 12
app.post("/name", (req, res) => {
var string = req.body.first + " " + req.body.last;
//use template literals to form a formatted string
  res.json({
    name: string
  });
})
module.exports = app;
