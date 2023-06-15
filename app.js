//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');

const date = require(__dirname + "/date.js");
const day = date.getDate();

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://NPS:1ULjC0Z30WJMX3Vj@cluster0.qanspl6.mongodb.net/todolistDB');

const todoSchema = new mongoose.Schema({
  itemName : String,
  listName : String
});

const item = mongoose.model('item', todoSchema);

const item1 = new item({itemName: "DSA", listName: day});
const item2 = new item({itemName: "WebD", listName: day});
const item3 = new item({itemName: "AppD", listName: day});

const defaultitems = [item1, item2, item3];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  item.find({listName: day})
  .then((items) => {

    if(items.length == 0){

      item.insertMany(defaultitems)
        .then((item) => {
          console.log("Succesfully inserted!");
        })
        .catch((err) => {
          console.log(err);
        });

      res.redirect("/");

    }
    else{

      item.find({listName: day})
      .then((main_items) => {
        res.render("list", {listTitle: day, newListItems: main_items});
      })

    }

  })
  .catch((err) => {
    console.log(err)
  });

});

app.post("/", function(req, res){

  const addeditem = req.body.newItem;
  const listTitle = req.body.list;

  const newitem = new item({itemName: addeditem , listName: listTitle});
  newitem.save()

  .then((savedDocument) => {
    console.log('Document saved!');

    if(listTitle === day){
      res.redirect("/");
    }else{
      res.redirect("/" + listTitle);
    }

  })
  .catch((err) => {
    console.error(err);
  });

});

app.post("/delete", function(req,res){

  const listTitle = req.body.listTitle;
  const deletedItemID = req.body.myCheckbox;

  item.findByIdAndDelete(deletedItemID)
  .then(() => {

    if(listTitle === day){
      res.redirect("/");
    }else{
      res.redirect("/" + listTitle);
    }

  })
  .catch((err) => {
    console.log(err);
  });

});

app.get('/:paramlist', function(req,res){

  const listTitle = _.capitalize(req.params.paramlist);

  item.find({listName: listTitle})
  .then((items) =>{
    res.render("list", {listTitle: listTitle, newListItems: items});
  })
  .catch((err) => {
    console.log(err)
  });

});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
