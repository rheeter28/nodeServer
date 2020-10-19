var jwt = require('jsonwebtoken');
var sequelize = require('../db');

var User = sequelize.import('../models/user');
//var User = require('../models/user')???s


module.exports = function(req, res, next){
  if(req.method == 'OPTIONS'){
    next()
  } else {
    var sessionToken = req.headers.authorization; //1 sessionToken is created to hold token that has been pulled from the authorization header
    console.log(sessionToken)//2  the token is printed to the console, this is for debugging purposes to make sure that the token is being sent to the server.IT SHOULD NOT BE LEFT IN THE FINAL CODE
    if(!sessionToken) return res.status(403).send({auth: false, message: 'No token provided.'});//3 if no token is present a 403 error is returned as a response.
    else{//4 No "user" property is ever povided in the request, so only tokens will get checked. This prevents unquthorized us of a token that was assinged to a different user
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {//5 the "verify" method decodes the token with the provided secret, then sends a callback with two variables. If sucessful, "decoded" will contains the decoded payload; if not, decoded remains undefined. "err" is "null" by default
        if(decoded){
          User.findOne({where: { id: decoded.id}}).then(user => {//6 If "decoded" has a value, the Sequelize "findOne" method looks for and "id" in the "users" table that matched the "decoded.id" property. This value is then passed into the a callback
            req.user = user;//7 The callback property sets the "user" value for the request as the "id" value passed to it then sends the request on to its next destination. The propery will be necessary later in adding to the database
            next();
          },
          function(){//8 If no matching "id"is found, an error message is thrown
            res.status(401).send({error: 'Not authorized'});
          });
        } else { //9 if no value for "decoded", and err message is thrown.
           res.status(400).send({ error: 'Not authorized!'});
        }
      });
    }
  }
}