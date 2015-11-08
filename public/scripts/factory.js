angular.module('instaSpotApp.MainFactory', [])

  .factory('MainFactory', function($location){
    var location = {};
    return{
        setCity: function(city, country, attraction, image){
          location.city = city;
          location.country = country;
          location.image = image;
          location.attraction = attraction;
        },
        getCity: function(){
          return location;
        },
        instruction: '',
        goHome: function(){
          $location.path('/');
        }
    }
  })