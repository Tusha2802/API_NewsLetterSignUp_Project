const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/SignUp.html");
})

app.post("/", function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    var data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields :{
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonObject = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/c83a3b2fe1";

    const Option = {
        method: "POST",
        auth: "Tushar: 48f3f1d872bc564efd949cfdecfa3a7-us1"
    }

    const request = https.request(url, Option, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonObject);
    request.end();
    
})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Server started at port 3000")
})

//API key
//ba49c1e5b899999b35a795e1e188a326-us1
//ba49c1e5b899999b35a795e1e188a326-us1
//bac41739b9337048999a5459ff5ebc35-us1
//8315bd756c08786720c14cf00dbfa8e2-us1
//961739b6756a0ebb0d0ecc891a081d42-us1
//af6ad4c977d5244b48a703ef7244a6be-us1

//List Id
//721e5bbb13
//721e5bbb13
//c83a3b2fe1