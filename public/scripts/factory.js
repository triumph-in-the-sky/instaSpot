angular.module('instaSpotApp.MainFactory', [])

  .factory('MainFactory', function(){
    var location = {};
    return{
        setCity: function(city, country, image){
          location.city = city;
          location.country = country;
          location.image = image;
        },
        getCity: function(){
          return location;
        }
    }
  })