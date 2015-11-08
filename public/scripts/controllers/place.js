angular.module('instaSpotApp')
  .controller('PlaceCtrl', ['$scope', 'MainFactory', function ($scope, MainFactory) {
    $scope.location = MainFactory.getCity();
  }]);