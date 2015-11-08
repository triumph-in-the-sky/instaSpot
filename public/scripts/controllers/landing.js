angular.module('instaSpotApp')
  .controller('LandingCtrl', function($scope, $location){
    $scope.init = function(){
      $('body')[0].style['background-color'] = '#d81921';
    };
    $scope.start = function(){
      $location.path('/m');
      $('body')[0].style['background-color'] = '#3b4b54';
    };
  })