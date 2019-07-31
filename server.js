const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var logger = require("morgan");
//const path = require('path')
//const dir = path.join(__dirname, 'public');
var Alarm = require("./AlarmModel");

const app = express();

app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
mongoose.connect('mongodb://localhost/alarm_db', {useNewUrlParser: true});

app.post('/alarms', (req, res)=>{
    Alarm.create(req.body)
    .then(function(dbAlarm){
        res.json(dbAlarm)
    })
})
app.get('/alarms', (req,res)=>{
    Alarm.find({})
    .then(function(dbAlarm){
        res.json(dbAlarm)
        console.log(dbAlarm)
    })
})
app.get('/delete/:id', (req, res)=>{
      let id =req.params.id;
      Alarm.findOneAndRemove({_id: id}, function(err){
          if(err){
              console.log(err);
              return res.status(500).send();
          }else{
              return res.status(200).send();
          }
      })
})


app.listen(8081, () => console.log('Listening on http://localhost:8081/'));