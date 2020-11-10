//const { json } = require("../server/db")

function fetchAllFromAuthRoute() {
  const fetch_url = 'http://localhost:3001/authtest/getall'
  const accessToken = localStorage.getItem('SessionToken') //1 We stored our token in 'localStorage' and we can access it by using 'getItem' method to get it back from localStorage
 

  const response = fetch(fetch_url, {
    method: "GET", //2 by default 'fetch' runs a "GET" request. we can use the 'method' property to send other requests. In this case we're still sending a GET
    headers: {
      'Content-Type' : 'application/json', //3 Content-Type header tell the server what kind of data is being sent in our preFlight request, if any
      'Authorization' : accessToken //4 Authorizaton header provides some sort of encrypted data allowing access to the server, in this case our token
        }
  
      })
    .then(response =>  {
      return response.json()
      
    })
    .then(data => {

      console.log(data)

    })
    .catch(error => { console.log('Error', error);

    })

}
/******************
 * FETCH/P0ST TO AUTH/CREATE
 *****************/
function postToAuthRouteCreate(){
  const fetch_url = 'http://localhost:3001/authtest/create'
  const accessToken = localStorage.getItem('SessionToken')

  let authTestDataInput = document.getElementById('authTestData').value; //1 we will grap whatever string that a user passes in to the feild
  
  const authInputData = {authtestdata: { item: authTestDataInput }}; //2 we package up that value up into an object

  const response = fetch(fetch_url, {
   method: "POST", //3 we are identifying this method as a POST request
   headers: {
     "Content-Type" : 'application/json',
     'Authorization' : accessToken
   },
   body: JSON.stringify(authInputData)//4 We package up the object as a json string and add it to the body of our request
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data)
  })
}

/*****************
 * GET ITEM BY USER
 ******************/
function getOneByUser() {
  let postIdNumber = document.getElementById('getNumber').value; //1 we get the "postIdNumber" provided in the "getNumber"feild. Because we are making an authenticated request, this "id " hs to exist in the database, as well as match the 'user.id' form the database for the use that you are using that is currently logged in

  const fetch_url = `http://localhost:3001/authtest/${postIdNumber}` //2 we pass the "postIdNumber" into the urle with a template literal
  const accessToken = localStorage.getItem('SessionToken')

  const response = fetch(fetch_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : accessToken
    }
  })
    .then(response => {
      return response.json();
    })
    .then(function (response){
      console.log(response);
      var myItem = document.getElementById('getItemValue'); //3 we target an element called "getItemValue" it a label tag
      myItem.innerHTML = response.authtestdata;//4 we set the value fo the labels to the value of response.authtestdata. This means that the data will be populated in the label when the DOM loads
    })
}
/*********************
 * PUT to authtest/update/:id
 **********************/
function updateItem(){
  let postIdNumber = document.getElementById('updateNumber').value;
  let authTestDataInput = document.getElementById('updateValue').value; //1 We get teh value of the input porvided from the user for both the "updateNumber" and "updateValue" feilds and assign each to a variable

  const fetch_url = `http://localhost0331/authtest/update/${postIdNumber}` //2 like before, we pass in the input form the user to the url with a template literal
  const accessToken = localStorage.getItem('SessionToken')

  let authInputData = {authtestdata : { item: authTestDataInput }};//3 we create an object that packages up our request. we captur the valu of authTestDataIput and store it in the variable authInputData variable
  const response = fetch(fetch_url, { 
    method: "PUT",//4 we are doing an update method so this will be a put request
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : accessToken
    },
    body: json.stringify(authInputData)//5 just like we did in the past POST Methods, we use stringify method to conver the object to JSON
  })
    .then(response =>{
      return response.json()
    })
    .then(data => {
      console.log(data)//6 we print the response to our fetch to the console
      var myItem = document.getElementById('newItemValue')//7 we make a reference to the label in stet 12 then set its value to  the data we put in the database
      myItem.innerHTML = data.authtestdata;
      fetchAllFromAuthRoute();//8 we run the "getall" function again and print the new contents of the database to the console.
    })

  }
function showCurrentData(e) { //1 e is the default variable name for an Event Listenter
  const fetch_url = `http://localhost:3001/authtest/${e.value}` //2 we pass the value fo the input field supplied by the user. because e is alread defined as the input field, we dont need to us a function to get another reference
  const accessToken = localStorage.getItem('SessionToken')

  fetch(fetch_url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken 
    }
  })
  .then(response =>{
    return response.json();
  })
  .then( function (response) {
    console.log(response);
    var myItem = document.getElementById('updateValue');//3 We call the DOM element we want to modify and set it to a variable to be accessed later
    if(!response) return; //4 if not item in the database maches the "id" we've supplied, the response comesback undefined.
    else myItem.value = response.authtestdata;//5 We could use innerHTML to set the value, but that method doesn't work the input elements. instead we use value to insert our data into the field
  })
}

function deleteItem() {
  let postIdNumber = document.getElementById('deleteNumber').value;

  const fetch_url = `http://localhost:3001/authtest/delete/${postIdNumber}`//1 Again we get the id number submitted by the use and pass it into the url via a template literal
  const accessToken = localStorage.getItem('SessionToken')

  const response = fetch(fetch_url, {
    method: "DELETE", //2 Our method is DELETE
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    }
  })
  .then(response =>{ //3 We print the response to the console and also run the "fetchAllFromAuthRoute" function again, which will print all the ites for our user to the console
    console.log(response);
    fetchAllFromAuthRoute()
  })

}
function fetchFromOneDisplayData() {
  const url = 'http://localhost:3001/authtest/getall';
  const accessToken = localStorage.getItem('SessionToken')

  fetch(url, {
    method: "GET",
    headers: new Headers ({
      'Content-Type': 'application/json',
      'Authorization': accessToken
    })
  }).then(
    function (response){
      return response.json()
    })
    .catch(
      function(error) {
        console.error("Error", error)
      })
    .then(
      function (response){
        let text = '';
        var myList = document.querySelector('ul#fourteen');//1 This is a little different wat of make  reference to a DOM elemement. We're aiming for a ul element with and id of tourteen the
        while (myList.firstChild) {//2 this is the same way we cleared out the sections elements in the NYT 
          myList.removeChild(myList.firstChild)
        }
        console.log(response);
        for (r of response) {//3 we us a for of loop to iterate through the values of each "key:value" object pair
          var listItem = document.createElement('li');//4 Given that were worke witha ul element, each loop will create a differenct li
          var testData = r.id + '' + r.authtestdata; //5 We create a string with the id and authtestdate properties, the put a string into the li element
          listItem.innerHTML = testData;
          listItem.setAttribute('id', r.id);//6 we add the id property of each objec as and id for each li. this will allow us to call the individually later
          myList.appendChild(listItem);//7 the li child element is added to the end of the ul parent element
          myList.addEventListener('click', removeItem);//8 we add our cuntom listener to run whenever a li is clicked


        }
      })
}
function removeItem(e){
  console.log(e); //1 Print e to the console to check which item we are clicking on
  var target = e.target; //2 targe is a nested object within e. this placces that object inside its own variable
  if(target.tagName !== "LI") return; //3 if the itme we are clicking on ins not a li element, the empty return statement exits the conditional
  else target.parentNode.removeChild(target); //4 we remove th eli child form the ul parent

  let x = target.getAttribute('id')//5Earlier we set an id for the li. Now we get it back so we can pass it to the DELETE request
  //deleteItemById(x); //6 This will become our delete request. In order for us to test what we have so far, we will just print x to the console
  console.log("The id number for this item is " + x);
}
