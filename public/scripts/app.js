var app = angular.module('instaSpotApp', ['instaSpotApp.mainFactory']);

app.run(function($rootScope, $window, $http){
  
});

//Changes active state for the navigation bar
app.controller('NavController', function($scope, $location){ 
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
})