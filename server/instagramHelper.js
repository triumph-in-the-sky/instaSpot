var instagram = require('instagram-node').instagram();
var apiKeys = require('../config');
var request = require('request');
var underscore = require('underscore');

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
// {
//   city: "Casablana",
//   country: "Morocco", 
//   attractions: [
//       "HassanIIMosque", 
//       "MuseeAbderrahmanSlaoui", 
//       "QuartierHabous", 
//       "PlayasAinDiabyLaCorniche", 
//       "OldMedinaofCasablanca", 
//       "MahkamaduPacha"]
// }, 
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
      // "HamraStreet", 
      "Harissa"
  ]
}];

var imageList = [];
var totalNumAttractions = 0;
var numAttractionsCovered = 0;

exports.getAllImages = function(req, res) {
  imageList = [];
  totalNumAttractions = 0;
  numAttractionsCovered = 0;
  //for each hashtag in hashtag list
  for (var i = 0; i < destinations.length; i++) {
    var place = destinations[i];
    var city = place.city;
    var country = place.country;
    var attractions = place.attractions;
    for (var j = 0; j < attractions.length; j++) {
      var attraction = attractions[j];
      totalNumAttractions++;
      //make an api call
      (function(city, country, attraction) {
        request({
          method: 'GET', 
          url:"https://api.instagram.com/v1/tags/" + attraction + "/media/recent",
          qs: {access_token: '181077755.c2ec312.5558c1a024264f15a7fce236b57fc941', 
               count: '15'}
          }, function(error, response, body) {
            var body = JSON.parse(response.body);

            parseApiResponse(body.data, city, country, attraction);
            numAttractionsCovered++;

            if (numAttractionsCovered === totalNumAttractions) {
              var shuffledImages = underscore.shuffle(imageList);
              res.send(shuffledImages);
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
