var app = angular.module('instaSpotApp', []);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/place', {
      templateUrl: 'views/place.html',
      controller: 'PlaceCtrl',
      controllerAs: 'place'
    })
    .when('/booking', {
      templateUrl: 'views/booking.html',
      controller: 'BookingCtrl',
      controllerAs: 'booking'
    })
    .otherwise({
      redirectTo: '/'
    });
});