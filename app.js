const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true})) //tell app to use the body-parser
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
  const fname = req.body["first-name"];
  const lname = req.body["last-name"];
  const email = req.body["email-id"];

  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
    }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/d66b2c7997"

  const options = {
    method: "POST",
    auth: "prateek:006e78126a8b740bad46c69f1b8722a9-us10"
  };

  const request = https.request(url,options,function(response){
    response.on("data",function(data){
      // console.log(JSON.parse(data));
    })
    if(response.statusCode==200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else
    {
      res.sendFile(__dirname+"/failure.html")
    }
  })
  request.write(jsonData);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server started at PORT 3000");
});




//API keys
// 006e78126a8b740bad46c69f1b8722a9-us10

// List Id
// d66b2c7997
