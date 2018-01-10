var express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var app = express();
var urlSchema = require('./urls.js');
const rand = require('csprng');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/new/*', (req, res) => {
    var url = req.url;
    var customCode = '';
    //replace the keyword 'new'
    url = url.replace('/new/', '');

    var isValid = validate(url);
    // send 400 if url is invalid
    if (!isValid)
        res.send(400, 'invalid url');
    else {
        // check if custom code is provided
        if (url.lastIndexOf('code') != -1) {

            // if provided, extract the code
            customCode = url.substring(url.lastIndexOf('code')).split('=')[1];
            //remove code from url
            url = url.substring(0, url.lastIndexOf('code') - 1);

        }
        createUrl(url, customCode, req, (err, data) => {
            if (err) {
                // if code already exists
                res.status(401);
                res.send('Code provided already exists. Please try with another code');
            } else {
                var response = {};
                response.original_url = url;
                response.short_url = data;
                res.json(response);
            }
        });
    }
});

var validate = (url) => {
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null)
        return false;
    else
        return true;
}

// go to the shortened url
app.get('/*', (req, res) => {
    var url = req.params['0'];
    var code = url.split('/').pop();
    urlSchema.findOne({ 'code': code }, (err, entry) => {
        if (err || !entry)
            res.json({ 'message': 'url not found' });
        else {
            var redirectTo = entry.original;
            if (!/^https?:\/\//i.test(redirectTo)) {
                redirectTo = 'https://' + redirectTo;
            }
            res.redirect('' + redirectTo);
        }

    });
});





var createUrl = (url, customCode, req, callback) => {
    var codeToPut = (customCode) ? customCode : rand(24, 24);
    var newurl = new urlSchema({
        original: url,
        createdAt: new Date(),
        code: codeToPut
    });
    newurl.save((err, resp) => {
        console.log(resp);
        if (err) {
            return callback(err);
        }
        callback(null, req.headers.host + '/' + resp.code);
    });
}


app.listen(process.env.PORT, () => {
    mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST);
    console.log('listening on port: ' + process.env.PORT);
});