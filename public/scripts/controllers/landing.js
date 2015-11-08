angular.module('instaSpotApp')
  .controller('LandingCtrl', ['$scope', '$location', '$window', 'MainFactory', function($scope, $location, $window, MainFactory){

    $scope.init = function(){
      $('body')[0].style['background-color'] = '#d81921';
      $scope.wish();
      if ($window.localStorage['InstaSpot']) {
        $scope.wishlist = true;
        populateDestinations();
        $scope.wish();
      } else {
        $scope.wishlist = false;
        document.body.style.backgroundImage = "url(../images/emirates.gif)";
        $scope.empty();
      }
    };

    $scope.start = function(){
      document.body.style.backgroundImage = "";
      $location.path('/m');
      $('body')[0].style['background-color'] = '#3b4b54';
    };

    $scope.empty = function(){
      $scope.buttonVal = 'Spot Your Destination';
      $('#button_container')[0].style['position'] = 'static';
      $('#button_container')[0].style['bottom'] = '';
      $('#button_container')[0].style['right'] = '';
      $('#button_container')[0].style['text-align'] = 'center';
      $('#button_container')[0].style['margin-top'] = '200px';
    };

    $scope.wish = function(){
      $scope.buttonVal = 'Spot A New Destination';
      $('#button_container')[0].style['position'] = 'fixed';
      $('#button_container')[0].style['bottom'] = '3%';
      $('#button_container')[0].style['right'] = '3%';
    };
    
    $scope.book = function(destination){
      MainFactory.setCity(destination.city, destination.country, destination.attraction, destination.url);
      document.body.style.backgroundImage = "";
      $location.path('/b');
      $('body')[0].style['background-color'] = '#3b4b54';
    };

    function populateDestinations() {
      $scope.destinations = [];
      var places = JSON.parse($window.localStorage['InstaSpot']).data;
      for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var city = place[0];
        var country = place[1];
        var attraction = place[2];
        var image = place[3];
        var destination = {
          city: city, 
          country: country,
          attraction: attraction,
          url: image,
        }
        $scope.destinations.push(destination);
      }
      console.log('wishlist destinations are ', $scope.destinations);
    };
  }])
