angular.module('instaSpotApp')
  .controller('LandingCtrl', function($scope, $location, $window){
    $scope.init = function(){
      $('body')[0].style['background-color'] = '#d81921';

      if ($window.localStorage['InstaSpot']) {
        $scope.wish(JSON.parse($window.localStorage['InstaSpot']));
      } else {
        $scope.empty();
      }
    };

    $scope.start = function(){
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
  })