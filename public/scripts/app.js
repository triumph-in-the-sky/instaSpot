var app = angular.module('instaSpotApp', ['instaSpotApp.MainFactory']);

app.run(function($rootScope, $window, $http){
  
});

//Changes active state for the navigation bar
app.controller('NavController', function($scope, $location, MainFactory){ 

  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };

  $scope.goHome = MainFactory.goHome;
})