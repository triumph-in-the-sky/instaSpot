var imageList = require('./images');

module.exports = {
  getAllImages: function(req, res){
    res.send(imageList); 
  }
};