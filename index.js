var express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var app = express();
var urlSchema = require('./urls.js');
const rand = require('csprng');

app.get('/new/*',(req,res)=>{
  // console.log(req);
    var url = req.url;
    url = url.replace('/new/','');
    var isValid = validate(url);
    if(!isValid)
      res.json({'message':'invalid url'});
  else{
    console.log(url);
    createUrl(url,req,(err,data)=>{
        if(err)
        res.sendStatus(500);
        var response = {};
        response.original_url=url;
        response.short_url=data;
        res.json(response);
    });
  }
});

var validate = (url)=>{
  var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

app.get('/*',(req,res)=>{
    var url = req.params['0'];
  // console.log(req.params);
    var code = url.split('/').pop();
    // console.log(code);
  urlSchema.findOne({'code':code},(err,entry)=>{
    console.log(entry);
        if(err||!entry)
        res.json({'message':'url not found'});
        else{
          var redirectTo = entry.original;
          if (!/^https?:\/\//i.test(redirectTo)) {
            redirectTo = 'https://' + redirectTo;
          }
          console.log(redirectTo);
          res.redirect(''+redirectTo);
        }
        
  });
});





var createUrl=(url,req,callback)=>{
  
    var newurl = new urlSchema({
        original:url,
        createdAt:new Date(),
        code:rand(24,24)
    });
    newurl.save((err,resp)=>{
      console.log(resp);
        if(err){
            return callback(err);
        }
        callback(null,req.headers.host+'/'+resp.code);
    });
}


app.listen(process.env.PORT,()=>{
    mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+process.env.DB_HOST);
    console.log('listening on port: '+process.env.PORT);
});