function handleSuccess () {
    const cohorts = request.response;
    console.log( this.response );
}

function handleError () {
    console.log( 'An error occurred 😞' );
}

const requestURL = '../data/cohorts.json';
const request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.onload = handleSuccess;



request.onerror = handleError;
request.send();

let result = document.getElementById('datos');

function showUsers(jsonObj) {
    var myTable = document.createElement('th');
    myTable.textContent = jsonObj['id'];
    result.appendChild(myTable);
  
    var myTd = document.createElement('td');
    myTd.textContent = jsonObj['name'];
    result.appendChild(myTd);
}


