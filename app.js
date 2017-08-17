const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const Mustache = require('mustache')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));


let todoList = {list: [
  {"pending":"Wash the dog"},
  {"complete":"Get oil change"},
]};

app.get('/todo', function(req, res){
  console.log(todoList);
  res.render('todo', todoList)
});

app.post("/", function (req, res) {
  console.log(req.body);
  todoList.list.push({"pending": req.body.pending});
  res.redirect('/todo');
})

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
