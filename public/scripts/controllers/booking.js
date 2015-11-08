angular.module('instaSpotApp')
  .controller('BookingCtrl', ['$scope', 'MainFactory', '$window', '$http', function ($scope, MainFactory, $window, $http) {
    $scope.location = MainFactory.getCity();
    $scope.date = new Date();
    $scope.flight = [];
    $scope.save = function(){
      var wishList = $window.localStorage['InstaSpot'];
      var data = MainFactory.getCity();
      var pack = {data: [[data.city, data.country, data.attraction, data.image]]};
      if (!wishList) {
        $window.localStorage['InstaSpot'] = JSON.stringify(pack);
      } else {
        wishList = JSON.parse(wishList);
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
          for(var i = 0; i < response.data.length; i++){
            var desination = response.data[i].destination.split(", ");
            if(desination[0] === $scope.location.city && desination[1] === $scope.location.country){
              $scope.flight.push(response.data[i]);
              console.log($scope.flight, 'flight');
            }
          }
        }, function errorCallback(response) {
          console.log('error');
        });
    })();

  }]);