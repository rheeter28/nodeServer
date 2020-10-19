var express = require('express'); //1
var router = express.Router();  //2
var sequelize = require('../db');
const { Router } = require('express');
const user = require('../models/user');
var TestModel = sequelize.import('../models/test'); //1
//3   //4  //5           //6
// router.get('/', function(req, res){
 //7
// res.send('Hey!!! This is a text route!')
// });

/***************************
 * Controller Method #1: Simple Response
 ***************************/

router.post('/one', function(req,res){
  res.send("Got a post request")
});
/***************************
 * Controller Method #2: Persisting Data
 ***************************/
router.post('/two', function(req, res){
  let testData = "Test data for endpoint two"; //2

  TestModel //3
    .create({  //4
      ///6
      testdata: testData //5
    }).then(dataFromDatabase => {
      res.send("Test Two went through!")
    })
});

/***************************
 * Controller Method #3: req.body
 ***************************/
router.post('/three', function(req, res) {
                  //1
  var testData = req.body.testdata.item;

  TestModel
    .create({ //2
      testdata: testData
    })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

//STEP 4 - Use this with Postman
router.post('/four', function(req, res){

  var testData = req.body.testdata.item;
  TestModel
  .create({
    testdata: testData
  })
  .then( //1
    function message(){ //2
      res.send("Test 4 went through!")
    }
  );
});

/***************************
 * Route 5: Return data in a promise
 ***************************/
router.post('/five', function ( req, res){
var testData = req.body.testdata.item;
TestModel
  .create({
    testdata: testData
  })
  .then(            //1
    function message(data) {
      res.send(data); //2
    }
  );
});

/***************************
 * Route 6: Return response as JSON
 ***************************/
router.post('/six', function (req, res){
  var testData = req.body.testdata.item;
  TestModel
    .create({
      testdata: testData
    })
    .then(
      function message(testdata) {
        res.json({
          testdata: testdata
        });
      }
    );
});

/***************************
 * Route 7: Handle errors
 ***************************/
router.post('/seven', function (req, res){
  var testData = req.body.testdata.item;

  TestModel
    .create({
      testdata: testData
    })
    .then(
      function createSuccess(testdata){
        res.json({
          testdata: testdata
        });
      },
      function createError(err){
        res.send(500, err.message);
      }
    );
})

/**********************
 * GET: Get simple message from server
 ************************/
router.get('/helloclient', function (req, res) {
  res.send('This is a message from the server to the client.')
})

/**********************
 * GET: /one
 ************************/
router.get('/one', function(req, res ){
  TestModel
  .findAll({ //1 Notice that we find the "attributes" for two of the columnss: "id" and "testdata". This is part of sequelize. If you are querying an entire table, you can choose which columns you want to grab from. The other columns will not be quiried, which can save time for a giant table.

    attributes: ['id', 'testdata'] 
  })
  .then(
    function findAllSuccess(data) {
      console.log("Controller data:", data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});



module.exports = router;