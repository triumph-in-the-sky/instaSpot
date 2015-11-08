angular.module('instaSpotApp')
  .controller('MainCtrl', ['$scope', '$window', '$http', '$location', 'MainFactory', function ($scope, $window, $http, $location, MainFactory) {
    var currentMainIndex = 0;
    
    $scope.go = function(url){
      $window.open(url, '_blank');
    }
    
    $scope.update = function(){
      var finalIndex = currentMainIndex + 5;
      for (var i = currentMainIndex; i < finalIndex && i < globalVariable.mainViewAllImages.length; i++){
        currentMainIndex++;
        $scope.tourSpot.push(globalVariable.mainViewAllImages[i])
      }
    }
    
    $scope.tourSpot = [];
    $http.get('/api/allImages')
    .then(function success(response){
      globalVariable.mainViewAllImages = response.data;
      $scope.update();
    });
    
    //Handles the logic to infinitely scroll through the app
    angular.element($window).bind("scroll", function() {
    
      //Change as Necessary. Might not work on every browser
      var height = window.innerHeight,
        currentPosition = document.body.scrollTop,
        bottom = document.body.scrollHeight;
    
      //Once the scroll position reaches a certain point execute the infinite scroll
      if ((height + currentPosition) >= (bottom - (height / 4))) {
        $scope.$apply(function(){ $scope.update(); });
      }
    });
    
    $scope.selectPlace = function(tour){
      MainFactory.setCity(tour.city, tour.country, tour.attraction, tour.url);
      globalVariable.placeViewAllImages = [];
      $location.path('/p');
    };
    
  }]);
