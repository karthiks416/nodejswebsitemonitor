# nodejswebsitemonitor

This is a simple website/application monitor using node.js.

It will check whether a site is up and notifies when a site is down. 

The following config params are to be modified as per your requirement. 

URLList : ["http://google.com"],--URLs that you wish to monitor

userId:"youremailid",-- From email address

password:"yourpassword",

timeout:300000,--Timeout in milliseconds

service:'Gmail',

subject:'**Website Monitor Alert',--subject of email

receipients:["youremailids"],--receipients who needs to recieve alerts

text:" is down. The error code is " --email body

