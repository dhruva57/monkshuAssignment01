import {APP_CONSTANTS} from "./constants.mjs";

var btn2 = document.getElementById('lOne');
var btn3 = document.getElementById('del');
var modal2 = document.getElementById('myModal2');

var check;


btn2.onclick = function() {
  modal2.style.display = "block";
  check = 0;
}




btn3.onclick = function() {
  modal2.style.display = "block";
  check = 1;
}

var subBtn = document.getElementById('submit');
var here = document.getElementById('here');

var rOneBtn = document.getElementById('submit2');
var rAllBtn = document.getElementById('lAll');


subBtn.onclick = function() {
  here.innerHTML = "";
  let userName = document.getElementById("userid").value;
  let contact = document.getElementById("con").value;
  let email = document.getElementById("email").value;
  let fn = document.getElementById("fn").value;
  let ln = document.getElementById("ln").value;

  addNewUser(userName,contact,email,fn,ln);
  
  }



  async function addNewUser(userName, contact, email, firstName,lastName){

    const newUser = { 
        firstName: firstName,
        lastName: lastName,
        mob: contact,
        email: email,
        name: userName
    };


  return  fetch(APP_CONSTANTS.API_REGISTER, {
      method: "POST",
      body: JSON.stringify(newUser)
    })
  .then(response => response.json())
  .then(data => {console.log(data);
      here.innerHTML = data.result;
    alert("user created")})
  .catch(error => console.log(error));
  console.log(result);



  }


rAllBtn.onclick = function(){
  here.innerHTML = "";
  const result =  fetch(APP_CONSTANTS.API_LIST_ALL)
    .then(response => response.json())
    .then(data => {
      console.log(data.result[0]);
      for(var i = 0 ; i < data.result.length; i ++ ){
        here.append(data.result[i] + "\n");
      }
      
    })
    .catch(error => console.log(error));
  // const data =  result.json();
  // console.log(data);

}


rOneBtn.onclick = function(){
    here.innerHTML = "";
  let userN = document.getElementById("userN").value;
  console.log(userN);
  if(check === 0){
    let result = fetch(APP_CONSTANTS.API_LIST_ONE, {
      body : JSON.stringify({name:userN}),
      method: "POST"
    })
    .then(response => response.json())
    .then(data => {console.log(data);
      here.innerHTML = data.result})
    .catch(error => console.log(error));
  }
  else{
    let result = fetch(APP_CONSTANTS.API_DELETE, {
      body : JSON.stringify({name:userN}),
      method: "POST"
    })
    .then(response => response.json())
    .then(data => {console.log(data);
      here.innerHTML = data.result})
    .catch(error => console.log(error));
  }
}