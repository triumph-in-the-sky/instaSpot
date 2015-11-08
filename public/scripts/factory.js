angular.module('instaSpotApp.mainFactory', [])

  .factory('mainFactory', function(){
    var location;
    return{
        setCity: function(city, country){
          location = [city, country];
        },
        getCity: function(){
          return location;
        }
    }
  })