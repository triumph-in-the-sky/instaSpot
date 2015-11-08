app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl',
      controllerAs: 'landing'
    })
    .when('/m', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/p', {
      templateUrl: 'views/place.html',
      controller: 'PlaceCtrl',
      controllerAs: 'place'
    })
    .when('/b', {
      templateUrl: 'views/booking.html',
      controller: 'BookingCtrl',
      controllerAs: 'booking'
    })
    .otherwise({
      redirectTo: '/'
    });
});