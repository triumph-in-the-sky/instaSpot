var instagram = require('instagram-node').instagram();
var apiKeys = require('../config');
var request = require('request');

//hardcoded destinations
var destinations = [{
  city: "Budapest",
  country: "Hungary",
  attractions: [
     "BudaCastle", 
     "FishermansBastion", 
     "StStephensBasilica", 
     "ChainBridge", 
     "HeroesSquare"]
}, 
{
 city: "Frankfurt",
 country: "Germany", 
 attractions: [
    "Palmengarten", 
    "StaedelMuseum", 
    "CathedralofStBartholomew", 
    "CommerzbankArena", 
    "EisenerSteg", 
    "Kleinmarkthalle",
    "FrankfurtZoo"]
}, 
{
  city: "Istanbul",
  country: "Turkey", 
  attractions: [
      "HagiaSofia", 
      "BasilicaCistern", 
      "BlueMosque", 
      "ToptakiPlace", 
      "BosphorusStrait"]
}, 
{
  city: "Shanghai",
  country: "China", 
  attractions: [
      "WorldFinancialCenter", 
      "ShanghaiCircusWorld", 
      "ShanghaiMuseum", 
      "YuGarden", 
      "OrientalPearlTower", 
      "OldFrenchConcession", 
      "HuangpuRiver", 
      "RiversidePromenade"]
}, 
{
  city: "Casablana",
  country: "Morocco", 
  attractions: [
      "HassanIIMosque", 
      "MuseeAbderrahmanSlaoui", 
      "QuartierHabous", 
      "PlayasAinDiabyLaCorniche", 
      "OldMedinaofCasablanca", 
      "MarcheCentral", 
      "MahkamaduPacha"]
}, 
{
  city: "Beirut",
  country: "Lebanon", 
  attractions: [
      "AlOmariMosque", 
      "AlShoufCedarNatureReserve", 
      "BatrounHarbour", 
      "Bcharre", 
      "BeirutSouks", 
      "BeiteddinePalace", 
      "BekaaValley", 
      "HamraStreet", 
      "Harissa"
  ]
}];

var imageList = [];


exports.getAllImages = function(req, res) {
  imageList = [];
  //for each hashtag in hashtag list
  for (var i = 0; i < destinations.length; i++) {
    var place = destinations[i];
    var city = place.city;
    var country = place.country;
    var attractions = place.attractions;
    for (var j = 0; j < attractions.length; j++) {
      var attraction = attractions[j];
      //make an api call
      (function(city, country, attraction) {
        request({
          method: 'GET', 
          url:"https://api.instagram.com/v1/tags/" + attraction + "/media/recent",
          qs: {access_token: '181077755.c2ec312.5558c1a024264f15a7fce236b57fc941', 
               count: '10'}
          }, function(error, response, body) {
            var body = JSON.parse(response.body);
            // console.log('response from api', body.data);
            parseApiResponse(body.data, city, country, attraction);
            console.log('image list length', imageList.length);
            if (imageList.length > 300) {
              console.log(imageList);
              res.send(imageList);
            }
          });
      })(city, country, attraction);
      
    }
  }
  //return imageList to the client  
}

  //make an api call

function parseApiResponse(data, city, country, attraction) {
  for (var i = 0; i < data.length; i++) {
    var media = data[i];
    if (media.type === 'image') {
      // console.log('image url', media.images.standard_resolution.url);
      var imageUrl = media.images.standard_resolution.url;
      var imageObject = {
        city: city, 
        country: country, 
        attraction: attraction, 
        url: imageUrl
      }
      imageList.push(imageObject);
    }
  }
}
