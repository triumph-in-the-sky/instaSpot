var destAuth = require('../config').emiratesDestinations;
var https = require('https');
var flightData = require('./flightData');

module.exports = {
  options:{
    rejectUnauthorized:false,
    method:'GET',
    hostname:'ec2-54-77-6-21.eu-west-1.compute.amazonaws.com',
    path:'/destinations/1.0',
    port:8143,
    headers:{
      Authorization:destAuth.Authorization,
      "Content-Type":'application/json'
    }
  },
  getDestinations:function(cb){
    console.log(this.options);
    https
    .get(this.options,function(res){
      var data = '';
      res.on('data', function(chunk){
        data += chunk;
      })
      res.on('end', function(){
        cb(JSON.parse(data));
      })
    })
    .on('error', function(e){
      console.log("EmiratesAPI Error:", e);
    });
  }, 
  getFlights:function(cb){
    cb(flightData);
  }
};

//https://ec2-54-77-6-21.eu-west-1.compute.amazonaws.com:8143/destinations/1.0