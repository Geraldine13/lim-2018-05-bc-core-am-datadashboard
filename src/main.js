const lima = document.getElementById('lima');
const generacion = document.getElementById('generacion');

// Almacenando la data Cohorst en una variable
const requestCohorts = '../data/cohorts.json';

// Obteniendo data de Cohorts
function getCohorts() {
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', requestCohorts);
    xhrCohorts.responseType = 'json';
    xhrCohorts.onload = handleSuccess;
    xhrCohorts.onerror = handleError;
    xhrCohorts.send();
}


const idLima = requestCohorts.map(requestLima => requestLima.id === 'lim');
const genLima = requestCohorts.filter(requestLima => requestLima.id === 'lim' );
console.log(genLima);



function handleSuccess () {
    const cohorts = request.response;
    console.log( this.response );
}

function handleError () {
    console.log( 'An error occurred 😞' );
}


/*function showUsers(jsonObj) {
    var myTable = document.createElement('th');
    myTable.textContent = jsonObj['id'];
    result.appendChild(myTable);
  
    var myTd = document.createElement('td');
    myTd.textContent = jsonObj['name'];
    result.appendChild(myTd);
}*/


