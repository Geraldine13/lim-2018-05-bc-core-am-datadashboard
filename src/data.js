function getUser(){
    const xhr = new XMLHttpRequest();
xhr.open('GET',`../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
xhr.onload = addUser;
xhr.onerror = handleError;
xhr.send();
}

function getCohorts(){
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts.json`);
    xhrCohorts.onload = addCohorts;
    xhrCohorts.onerror = handleError;
    xhrCohorts.send(); 
}
 
function handleError(){
    console.log('se ha presentado un error');
}
const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const table = document.getElementById('container-user');
generacion.addEventListener('click', function(e){
    table.innerHTML = '';
    getUser();
});
function addUser(){
  
    const data = JSON.parse(this.responseText);
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        tr.innerText += data[i].name;
        table.appendChild(tr);
    }
    
}
li.addEventListener('click', function(e){
    generacion.innerHTML = '';
    getCohorts();

});
function addCohorts(){
    const dataCohorts = JSON.parse(this.responseText);
    //console.log(dataCohorts[0]);
    
    for(var i=0;i<dataCohorts.length;i++){
        let option = document.createElement('option');
        option.setAttribute('value',dataCohorts[i].id)
        option.innerText += dataCohorts[i].id ;
        generacion.appendChild(option);
    }
}