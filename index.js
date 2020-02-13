const express =require("express");
const bodyParser =require("body-parser");
const request =require("request");
const app =express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
      var crypto=req.body.crypto;
      var fiat=req.body.fiat;
      var number=req.body.number;
      var options={
          url: "https://apiv2.bitcoinaverage.com/convert/global",
          method: "GET",
          qs: {
              from: crypto,
              to: fiat,
              amount: number
          }
      };
    // here body would get back the response in json format
request(options,function(error , response , body){
    var data =JSON.parse(body);
    var price=data.price;
    //remember res.send() is the terminator of .post block like break; so to send multiple data we use app.write() then we use app.send() to terminate the statement
    res.write("<p>the current date is "+data.time+"</p>");
    res.write("<p>the price is "+price+" usd</p>");
    res.send();
});
});
app.listen(3000,function(){
    console.log("server is runing on port 3000");
});