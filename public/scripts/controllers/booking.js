angular.module('instaSpotApp')
  .controller('BookingCtrl', ['$scope', 'MainFactory', function ($scope, MainFactory) {
    $scope.location = MainFactory.getCity();
  }]);