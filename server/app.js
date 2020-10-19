require('dotenv').config(); //1 Add *.env to your .gitignore to prevent it form peing published to GitHub

var express = require('express');  
var app = express(); 
var test = require('./controllers/testcontroller')
var authTest = require('./controllers/authtestcontroller'); //1 we imprted the "authertestcontroller" file for access to the endpoints. We will create thsi file in the next module. Until then, you server might thrown and error, as its looking for a file that does not exist

var user = require('./controllers/usercontroller') //1 we import the usercontroller.js filer
var sequelize = require('./db')

sequelize.sync(); // tip: pass in {force: true} for ressetting tables
          
app.use(express.json());//1


app.use(require('./middleware/headers'))

/*************************
 *  EXPOSED ROUTES
 **********************/
app.use('/test', test)
app.use('/api/user', user); //2 we setup a route to the endpoints for the 'api/user' route

//3 Your could also write it this way without the require statement above. (Just another way to write our your routes. Just be consistent)
// app.use('/api/user', require('./controllers/usercontrollers'));

/*************************
 *  PROTECTED ROUTES
 **********************/

app.use(require('./middleware/validate-session'));// we impoted the "validate-session" middleware, which will check to see if the incoming request has a token
app.use('/authtest', authTest); // Anything beneath the "validate-session" will require a token to access, this becoming protected. Anything above it iwll not require a token, remaining unprotected. Therefor the "test" and "user" routes are not protected, while the "authtest" route is protected



app.listen(3001, function(){
  console.log('App is listening on 3001')  
});

// app.use('/api/test', function(req, res){
//   res.send("This is data form the /api/test endpoint, It's from the server.")
// });







 