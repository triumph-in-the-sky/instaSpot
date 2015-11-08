angular.module('instaSpotApp')
  .controller('PlaceCtrl', ['$scope', 'mainFactory', function ($scope, mainFactory) {
    console.log(mainFactory.getCity());
  }]);