var instagram = require('instagram-node').instagram();
var apiKeys = require('../config');
var request = require('request');

//hardcoded destinations
var destinations = [{
  city: "Budapest",
  country: "Hungary",
  attractions: [
     "BudaCastle", 
     "Fisherman'sBastion", 
     "St.Stephen'sBasilica", 
     "ChainBridge", 
     "Heroes'Square"]
}, 
{
 ciy: "Frankfurt",
 country: "Germany", 
 attractions: [
    "Palmengarten", 
    "StaedelMuseum", 
    "CathedralofSt.Bartholomew", 
    "Commerzbank-Arena", 
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
  //for each hashtag in hashtag list
  for (var i = 0; i < destinations.length; i++) {
    var place = destinations[i];
    var city = place.city;
    var country = place.country;
    var attractions = place.attractions;
    for (var j = 0; j < attractions.length; j++) {
      var attraction = attractions[j];
      //make an api call
      request
        .get('https://api.instagram.com/v1/tags/' + attraction + '/media/recent?access_token=' + apiKeys.accessToken)
        .on('response', function(response) {
          //call parseApiResponse on the api response
          console.log(response.data);
          parseApiResponse(response.data, city, country, attraction);
        });
    }
  }
  //return imageList to the client
  console.log('image list', imageList);
  res.send(imageList);
}

  //make an api call

function parseApiResponse(data, city, country, attraction) {
  for (var i = 0; i < data.length; i++) {
    var media = data[i];
    if (media.type === 'image') {
      console.log('image url', media.images.standard_resolution.url);
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

// //pass instagram client secret and id to instagram module
// instagram.use({client_id: apiKeys.clientId, 
//                client_secret: apiKeys.clientSecret});

// var redirect_url = "http://localhost:6001/handleauth";
// //later change this to http://instaspot.mybluemix.net/handleauth

// exports.authorize_user = function(req, res) {
//   console.log('running authorize_user');
//   res.redirect(instagram.get_authorization_url(redirect_url));KB
// }

// exports.handleauth = function(req, res) {
//   instagram.authorize_user(req.query.code, redirect_url, function(err, result) {
//     if (err) {
//       console.log(err.body);
//       res.send('Did not work');
//     } else {
//       console.log('Yay! Access token is ' + result.access_token);
//       res.send('You made it!!');
//     }
//   });
// };
