const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

//Mongoose stuff
mongoose.connect('mongodb://heroku_sl5t668c:d4gmc54o0iiei8jfqc27e2gife@ds033066.mlab.com:33066/heroku_sl5t668c');
const db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

var Schema = mongoose.Schema;

var ContactSchema = new Schema({

      first_name: String,
      last_name: String,
      email: String,
      phone: String,
      birthdate: Date,
      picture: String,
      groups: Array,
      comments: String

});

var Contact = mongoose.model('Contact', ContactSchema);

//Public
app.use(express.static('public'));

//Body Parser
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 


app.get('/', function(req, res){
    res.render('index');
})

app.get('/total', function(req, res){

    Contact.find(function (err, contacts) {
      if (err) return console.error(err);
      
      res.send(contacts);
    });
})

app.post('/add', function(req, res){
    var data = req.body;

    var newContact = new Contact(data);

    newContact.save(function (err, result){
        if(err){
            console.log(err);
            res.send('Sorry there was an error!');
        }
        else{
            res.send('New contact saved successfully!');
        }
    })

})

app.post('/delete', function(req, res){
  var data = req.body.id;

  console.log(data);

  Contact.findOneAndRemove({'_id' : data}, function(err, result){
    if (err){console.log(err)};
    //console.log(result);

    res.send('delete succesful');
  })

})

app.post('/edit', function(req, res){
    var data = req.body;

    Contact.findOneAndUpdate({'email' : data.email}, data, function (err)
{
  if (err)
  {
      console.log(err);
  }
  else
  {
      res.send('update successful');
  }
})
})


app.listen(port);