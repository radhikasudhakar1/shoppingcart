var logindetails  = require('./login.json');
var categorydetails = require('./categories.json');
var productdetails = require('./product.json');
var secondRoute = require('./test.json');
//var thirdRoute  = require('./jsonfile3.json');
//var fourthRoute = require('./jsonfile4.json');
// and so on

module.exports = function() {
return {
login  : logindetails,
category : categorydetails,
product : productdetails,
secondRoute : secondRoute,
//thirdRoute  : thirdRoute,
//fourthRoute : fourthRoute
// and so on
 }
}