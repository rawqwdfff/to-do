
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', "ejs");

let items = ["DSA" ,"WebD" , "DevOps"];
let workitems = [];

app.get("/", function(req,res){
  let today = new Date();
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let day = today.toLocaleDateString('en-US', options);
  res.render("list", {ListItem : day , newListItem : items});
});

app.post('/', function(req,res){
  let item = req.body.newActivity;
  console.log(req.body);

  if(req.body.value === " lol"){
    workitems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {ListItem : 'lol' , newListItem : workitems});
});

app.post("/work", function(req,res){
  console.log(req.body);
  let item = req.body.newActivity;
  workitems.push(item);
  res.redirect("/work");
});

app.listen(3000,function(){
  console.log("bhai sab bhul gya kya!");
});
