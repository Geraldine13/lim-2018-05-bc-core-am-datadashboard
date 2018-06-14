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