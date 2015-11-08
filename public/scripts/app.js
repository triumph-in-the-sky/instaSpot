var app = angular.module('instaSpotApp', []);

var globalVariable = {
  mainViewAllImages : [],
  mainViewImages : [],
  placeViewAllImages : [],
  placeViewImages : []
}

app.run(function($rootScope, $window, $http){
  //Handles the logic to infinitely scroll through the app
  
  
  
});

//Changes active state for the navigation bar
app.controller('NavController', function($scope, $location){ 
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
})