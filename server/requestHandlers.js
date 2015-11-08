var imageList = require('./images');
var apiUtils = require('./apiUtils');
var flightData = require('./flightData');

module.exports = {
  getAllImages: function(req, res){
    res.send(imageList); 
  },
  getAllDestinations: function(req, res){
    apiUtils.getDestinations(function(data){
      res.send(data);
    })
  },
  getImagesFromPlace:function(req, res){
    //your code here
    res.send(200);
  }, 
  getFlights:function(req, res){
    res.send(flightData.filter(function(){
      return true;
    }))
  }
};