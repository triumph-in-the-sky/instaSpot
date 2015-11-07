//Parse Instagram API data

var imageList = [];

//for each hashtag in hashtag list, 
  //make an api call
    //call parseApiResponse on the api response, e.g. parseApiResponse(response[data])
//return imageList to the client

function parseApiResponse(data, city, country, attraction) {
  for (var i = 0; i < data.length; i++) {
    var media = data[i];
    if (media[type] === 'image') {
      var imageUrl = media.images.standard_resolution.url;
      var imageObject = {
        city: city, 
        country: country, 
        attraction: attraction, 
        url: imageUrl
      }
      imageList.push(imageObject);
    }
  }
}
