angular.module('instaSpotApp')
  .controller('BookingCtrl', ['$scope', 'MainFactory', '$window', function ($scope, MainFactory, $window) {
    $scope.location = MainFactory.getCity();

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
  }]);