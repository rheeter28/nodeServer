var express = require('express')
var router = express.Router();     //1 We bring in our necessary imports. Same as the testconroller, just with a User model now
var sequelize = require('../db');
var User = require('../models/user')(sequelize, require("sequelize"));
var bcrypt = require('bcryptjs'); // delaring a new variable for 'bcryptjs' to add to our database
var jwt = require('jsonwebtoken');

/***************************
 ** Create User Endpoint: Starter ***
 ***************************/
 
//2 We start out our POST() method for a 'creatuser' endpoint
//  router.post('/createuser', function (req, res){
//    var username = "The Dude";
//    var pass = "therugtiedtheroomtogether";                 /**3**/ // Inside the method, we have the basics for creating a new user and returning a message in the response

//    User.create({
//      username: username,
//      passwordhash : pass
//    })
//    .then(
//      function message(){
//        res.send("I hate the Eagles, man");
//      }
//    );
//  })

/***************************
* REFACTORING
***************************/
router.post('/createuser', function (req, res) {
  var username = req.body.user.username;
  var pass = req.body.user.password;
// '/createuser' ??
  User.create({
    username: username,
    passwordhash: bcrypt.hashSync(pass, 10) //1
  })
    .then(
      function createSuccess(user) {
        //1        //2      //3           //4        //5  //1.1
        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }); //J.W.T stands for JSON WEB TOKEN
        res.json({
          user: user,
          message: 'created',  //1 Along with the user object that gets returned as JSON, we can send a mesage in the response
          sessionToken: token //6
        })
      },
      function createError(err) {

        res.send(500, err.message);
      }
    )
})


router.post('/signin', function (req, res) {
  User.findOne({ where: { username: req.body.user.username } }).then(
    function (user) {
     
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
          //1
          if (matches) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            //2
            res.json({ //3
              user: user,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else { //4
            res.status(502).send({ error: "you failed" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },

    function (err) {
      res.status(501).send({ error: "you failed, yo" });
    }

  );
});

module.exports = router;
/* Sign in Method Analysis
  1. The 'fineOne()' method is Sequelize method that does exactley what is says: it tries to finde something within the database that we tell it to look for> This is call Data Retrieval.
  2. "where" is an object within sequal that tells the database to look for something matching its properties.
  3. We're looking in the 'username' column in the "user" table for one thing that matches the value passed form the client
  4. The promise is handled within the ".then()" function
  5. Here we have a function that is called whien th promisr is resolved, and if successful, sends the 'user' object back in th response
  6. Function call if th epromis is rejected. We print the rron to the console
  7. We're sending th data this time, so we use "router.post" INSTEAD of "router.get"
  /*



 /**
  * REFACTORING
  * 1 create variable to hold the token
  * 2 .sign() method greated the token, It takes at least 2 parameters: the payload and the signature. You can also supply some specific options or a callback.
  * 3 THis is the payload, or data we are sending. 'user.id' is the primary key of the user table and is the number assigned to the user when created in the database
  * 4 This is the signature, which is used to help encode and decode the token. You can make it anything you want, ande we will make this private later
  * 5 We set an option to make the token expire. Here we are takeing (seconds,minutes,hours); in other words, 1 day.
  * 6 We pass the value of the token back in our response. The server has now assignd a token to a specific user, and the client will have that token to work with (once we have a client)
  *
  * 1.1 The system goes outside the current file to the .env file, where it looke for somethinkg called JWT_SECRET. The valuse of the secret is stored in that environment variable
 */