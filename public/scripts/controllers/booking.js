angular.module('instaSpotApp')
  .controller('BookingCtrl', ['$scope', 'MainFactory', '$window', '$http', function ($scope, MainFactory, $window, $http) {
    $scope.location = MainFactory.getCity();
    $scope.date = new Date();
    $scope.flight;
    $scope.save = function(){
      var wishList = $window.localStorage['InstaSpot'];
      var data = MainFactory.getCity();
      var pack = {data: [[data.city, data.country, data.attraction, data.image]]};
      if (!wishList) {
        $window.localStorage['InstaSpot'] = JSON.stringify(pack);
      } else {
        console.log(wishList);
        wishList = JSON.parse(wishList);
        console.log(wishList);
        wishList.data.push(pack.data[0]);
        $window.localStorage['InstaSpot'] = JSON.stringify(wishList);
      }
    };
    (function (){
      $http({
        method: 'GET',
        url: '/api/flights'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response, 'response');
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    })();

  }]);