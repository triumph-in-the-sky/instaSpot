var globalVariable = {
  mainViewAllImages : [],
  placeViewAllImages : [],
  options : {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  },
  success : function(pos) {
    var crd = pos.coords;
  
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  },
  error : function(err){
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }
}

navigator.geolocation.getCurrentPosition(globalVariable.success, globalVariable.error, globalVariable.options);