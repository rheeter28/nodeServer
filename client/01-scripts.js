// const router = require("../server/controllers/testcontroller");

function fetchHelloDataFromAPI(){
  fetch('http://localhost:3001/test/helloclient', { //1 
    method: 'GET',
    headers: new Headers({//2
      'Content-Type': 'application/json'
    })
})
  .then(function(response) {
    console.log("Fetch response:", response)
    return response.text();//3
  })
  .then(function (text) {
    console.log(text);
  });

}


/********************** 
* 2nd POST long hand: /one
***********************/
function postToOne(){
  var url = 'http://localhost:3001/test/one';


fetch(url, {
  method: 'POST',               //1 we are feching a new url. the rouft in the server haneldes a POST request, so our metheod is POST. Remember that the two must match the route request and the method.
  headers: new Headers({
    'Content-Type': 'application/json'
  })
}).then(
  function(response){   //2 WE pass the response into a Promise that returns the response as plain text. 
    return response.text()
  })
  .catch(
    function(error){ //3 We handled an error, of an error comes back
      console.log('Error:', error)
    })
    .then(function(response){ //4 In the final then(), we simply proint the plain text response to the console
      console.log('Success:', response)
    })
}

/********************** 
* 3 POST /one : Arrow Function
***********************/
function postToOneArrow(){
  var url = 'http://localhost3001/test/one';

  fetch(url, {           
    method: 'POST',     //1 Were reaching out to an endpoint woth a POST request. We add the appropriate headers.
    headers: new Headers ({
      'Content-Type': 'application/json'
    })
  }).then(res => res.text()) //2 We are asking for a plain text response
  .catch(error => console.log('Error', error)) //3 We handle an error, if there is one
  .then(response => console.log('Success:', response)); //4 In the end, we simply prond the data to the console
}



function postData() {
//1 We set up an object, just like we would have in Postman. We have a preset string as the value of the 'item' property
let content = { testdata: { item: 'This was saved!' } };

//2 We target some specifit 'ids' in teh DOM. These elements will hosd the value of the response that comes back after the post is stored
let testDataAfterFetch = document.getElementById('test-data');
let createdAtAfterFetch = document.getElementById('created-at');

fetch('http://localhost:3001/test/seven', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(content) //3 We pass in our pre-defined object into the 'fetch' with in the 'body' property. Notice that the 'method' property is now POST instead of GET
})
.then(response => response.json())
.then(function(text) {
  console.log(text);
  //4 Our response comes back as it printed to the console, andi it is also displayed to the user along with the timestamp we acces the seperate values callin 'text.data. In the DOM, the 'innerHTML' property allows us to take the plain text that we get back and display it in the targeted element
  testDataAfterFetch.innerHTML = text.testdata.testdata;
  createdAtAfterFetch.innerHTML = text.testdata.createdAt;
})
}
  
/**********************
 * 4 GET: .ONE - Display Data
 ************************/
function fetchFromOneDisplayData(){
  //1 We set up our URL in one variables and target the "data-one" id in the DOM in another one
  let url = 'http://localhost:3001/test/one';
  let dataView = document.getElementById('display-one');

  //2 We creata a "fetch()" with "Headers" and the request method of "GET". There are lso chained promises that handle the data whenit returnd or handle an error if one comes back
  fetch(url, {
    method: 'GET',
    headers: new Headers({
    'Content-Type': 'application/json'
    })  
  }).then(
    function(response){
      return response.json()
    })
    .then(
      function(error){
        console.error('Error:', error)
      })
    .then(
      function(results){
      let mylist = document.querySelector('#getjson'); //3 Inside the ".then()", we are going to work towards shodiwng the returnded data in the DOM. We start by tarteding the "getjson" id in the DOM and attaching the value to the myList variable.
      
      for(r of results){ //4 We set a "for of" loop
        console.log('Response:', r.testdata);//5 We write a "console.log()" statement to show how we van access the valuses tahat come backt in the object inside the response.
        var listItem = document.createElement('li');//6 We create another variable called "listItem". The "createElement()" method will create that type of element ind the DOM. In this case, we creat a list item,, "li", every time we iterate
        listItem.innerHTML = r.testdata; //7 Wach time we inerate, we store the value of "r.testdata" in the newly created "li"
        mylist.appendChild(listItem);//8 We call "appendChild()" on "myList", which means that each time we iterate we put the "li" into the unordered list
      }
   })
}

