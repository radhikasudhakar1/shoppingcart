var logindetails  = require('./login.json');
var categorydetails = require('./categories.json');
var productdetails = require('./product.json');
var secondRoute = require('./test.json');
var product1 = require('./product1.json');
var product2 = require('./product2.json');
var product3 = require('./product3.json');
var product4 = require('./product4.json');
var product5 = require('./product5.json');




//var thirdRoute  = require('./jsonfile3.json');
//var fourthRoute = require('./jsonfile4.json');
// and so on

module.exports = function() {
return {
login  : logindetails,
category : categorydetails,
product : productdetails,
secondRoute : secondRoute,
product1 : product1,
product2 : product2,
product3 : product3,
product4 : product4,
product5 : product5


//thirdRoute  : thirdRoute,
//fourthRoute : fourthRoute
// and so on
 }
}