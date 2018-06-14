const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const table = document.getElementById('container-user');
//obteniendo data Cohorts
function getCohorts(){
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts.json`);
    xhrCohorts.onload = addCohorts;
    xhrCohorts.onerror = handleError;
    xhrCohorts.send(); 
}
//conectando data user
function getUser(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET',`../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
    xhr.onload = addUser;
    xhr.onerror = handleError;
    xhr.send();
}
function handleError(){
    console.log('se ha presentado un error');
}
li.addEventListener('click', function(e){
    e.preventDefault();
    generacion.innerHTML = '';
    getCohorts();
});
function addCohorts(){
    const dataCohorts = JSON.parse(event.currentTarget.responseText);
    for(var i=0;i<dataCohorts.length;i++){
        let option = document.createElement('option');
        option.setAttribute('value',dataCohorts[i].id)
        option.innerText += dataCohorts[i].id ;
        generacion.appendChild(option);
    }
}
function addUser(){
    const data = JSON.parse(event.currentTarget.responseText);
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        tr.innerText += data[i].name;
        table.appendChild(tr);
    }
}
generacion.addEventListener('change', function(e){
    if(generacion.value === 'lim-2018-03-pre-core-pw'){
    table.innerHTML = '';
    getUser();
    }else{
        table.innerHTML = 'No hay datos para mostrar';
    }
});