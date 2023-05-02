const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");
console.log(date.getDay());
const app = express();
let items = [];
let workitems = [];
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newitems: items
  });
});
app.post("/", function(req, res) {
  let item = req.body.newitem;
  if (req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");
  } else

  {
    items.push(item);
    res.redirect("/");
  }
});
app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: "Work List",
    newitems: workitems
  });
});
app.post("/work", function(req, res) {
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});
app.listen(3000, function() {
  console.log("server is running");
});
