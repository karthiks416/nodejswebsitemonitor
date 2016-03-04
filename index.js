"use strict";

var express = require("express");
var request = require('request');
var nodemailer = require('nodemailer');
var config=require('./config/config');
var app = exports.app = express();
var that=this;
this.flag=true;

app.set('port', (process.env.PORT || 5000));
var transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.userId, 
                pass: config.password 
            }
        });
//check status of each url and send only one consolidated mail. You can get mail for each and need to remove flag check.
   config.URLList.forEach(function (URL) { 
setInterval(function(){
request({
    url: URL,

}, function(err, response, body) {
    if (!err && response.statusCode == 200) {
        console.log("page is up........");
        this.flag=true;
      
    } else {
    
        console.log("page is down.......");

        if(that.flag){
                    var mailOptions = {
                        from: config.userId, 
                        to: config.receipients, 
                        subject: config.subject, 
                        text: URL+config.text+err.code
                           
                    };
 
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                                     console.log(error);
                                   } 
                        else {
                              console.log('Message sent: ' + info.response);
                            };
                    });
           }
        that.flag=false;
       
    }
});
},config.timeout);


});


app.listen(app.get('port'), function() {
    console.log("server started, listening on port " + app.get('port'));
});

