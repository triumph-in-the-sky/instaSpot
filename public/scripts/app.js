var app = angular.module('instaSpotApp', []);

app.run(function($rootScope, $window){
  $rootScope.name = 'Scope Name';
  
  angular.element($window).bind("scroll", function() {
    // Change as Necessary. Might not work on every browser //
    var height = window.innerHeight,
        currentPosition = document.body.scrollTop,
        bottom = document.body.offsetHeight;
    //////////////////////////////////////////////////////////
    if ((height + currentPosition) >= bottom) {
      //TODO
    }
  });
});

app.controller('NavController', function($scope, $location){ 
  $scope.isActive = function (viewLocation) { 
    return viewLocation === $location.path();
  };
})