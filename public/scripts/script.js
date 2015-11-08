var globalVariable = {
  mainViewAllImages : [],
  placeViewAllImages : [],
  options : {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  },
  success : function(pos) {
    globalVariable.crd = pos.coords;
  },
  error : function(err){
    console.warn('ERROR(' + err.code + '): ' + err.message);
  }
}

navigator.geolocation.getCurrentPosition(globalVariable.success, globalVariable.error, globalVariable.options);