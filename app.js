require("dotenv").config();

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
  
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apikey = process.env.API_KEY;
    const url = process.env.API_URL + query +" &appid="+apikey;
    
    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data){
    
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp
            const weatherDescription = WeatherData.weather[0].description
            res.write("<p>The weather is currently " +weatherDescription+ "<p>");
            res.write("<h1>The temperaturre in " + query + " is " + temp+ "degree celcius.</h1>");
            res.send() 
        });
    });
});

app.listen(3000, function(){
    console.log("server is running on port 3000.");
}); 