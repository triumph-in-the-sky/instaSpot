angular.module('instaSpotApp')
  .controller('LandingCtrl', function($scope, $location, $window){
    $scope.init = function(){
      $('body')[0].style['background-color'] = '#d81921';
      $scope.wish();
      if ($window.localStorage['InstaSpot']) {
        console.log('wishlist exists');
        $scope.wishlist = true;
        populateDestinations();
      } else {
        $scope.wishlist = false;
        document.body.style.backgroundImage = "url(../images/emirates.gif)";
      }
    };

    $scope.start = function(){
      document.body.style.backgroundImage = "";
      $location.path('/m');
      $('body')[0].style['background-color'] = '#3b4b54';
    };

    $scope.empty = function(){
      $('#button_container')[0].style['text-align'] = 'center';
      $('#button_container')[0].style['margin-top'] = '200px';
    };

    $scope.wish = function(){
      $('#button_container')[0].style['position'] = 'fixed';
      $('#button_container')[0].style['bottom'] = '3%';
      $('#button_container')[0].style['right'] = '3%';
    };

    function populateDestinations() {
      $scope.destinations = [];
      var places = JSON.parse($window.localStorage['InstaSpot']).data;
      for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var city = place[0];
        var country = place[1];
        var destination = {
          city: city, 
          country: country
        }
        $scope.destinations.push(destination);
      }
      console.log('wishlist destinations are ', $scope.destinations);
    };
  })
