
const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const table = document.getElementById('container-user');

function getUsers(){
    const xhr = new XMLHttpRequest();
        xhr.open('GET',`../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
        xhr.onload = function () {
            const dataUsers = JSON.parse(event.currentTarget.responseText);
            const xhrCohorts = new XMLHttpRequest();
            xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
            xhrCohorts.onload = function () {
                const dataProgress = JSON.parse(event.currentTarget.responseText);
                //console.log('cohort',dataCohorts.id = 'lim-2018-03-pre-core-pw')
                const computeUsersStats = () => {
                    const users = dataUsers.map(user => {
                        //console.log(dataProgress[user.id].intro.units)
                        const percentProgress = () =>{
                            if(dataProgress[user.id].hasOwnProperty('intro')) {
                                if(dataProgress[user.id].intro.hasOwnProperty('percent')) {
                                    return dataProgress[user.id].intro.percent;
                                } 
                            } 
                        }
                        const exercisesProgress = () => {
                            if(dataProgress[user.id].hasOwnProperty('intro')){
                              if(dataProgress[user.id].intro.hasOwnProperty('units')) {
                                if(dataProgress[user.id].intro.units['02-variables-and-data-types'].parts['06-exercises'].hasOwnProperty('exercises')){
                                    return Object.values(dataProgress[user.id].intro.units['02-variables-and-data-types'].parts['06-exercises'].exercises).length
                                }
                              }
                            }
                        }
                        
                        const exercisesCompleted = () => {
                            if(dataProgress[user.id].hasOwnProperty('intro')){
                              if(dataProgress[user.id].intro.hasOwnProperty('units')) {
                                if(dataProgress[user.id].intro.units['02-variables-and-data-types'].parts['06-exercises'].hasOwnProperty('completed')){
                                    return dataProgress[user.id].intro.units['02-variables-and-data-types'].parts['06-exercises'].completed;
                                }
                              }
                            }
                        }
                           
                        const obj = {
                            percent: percentProgress(),
                            exercises: {
                                total: exercisesProgress(),
                                completed: exercisesCompleted(),
                                //percent: 

                            }
                        };
                            return obj;
                    });
                console.log(users);
                }
                computeUsersStats()
            }
            xhrCohorts.onerror = handleError;
            xhrCohorts.send(); 
        };
        xhr.onerror = handleError;
        xhr.send();
} // 
li.addEventListener('click', function(e){
    generacion.innerHTML = '';
    getUsers();
});
function handleError(){
    console.log('se ha presentado un error');
}
/* obteniendo data cohorts
function getCohorts(){
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts.json`);
    xhrCohorts.onload = addCohorts;
    xhrCohorts.onerror = handleError;
    xhrCohorts.send(); 
}
obteniendo data progress
function getProgress(){
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
    xhrCohorts.onload = addProgress;
    xhrCohorts.onerror = handleError;
    xhrCohorts.send(); 
}
obteniendo data users
function getUser(){
    
    const xhr = new XMLHttpRequest();
        xhr.open('GET',`../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
        xhr.onload = addUser;
        xhr.onerror = handleError;
        xhr.send();
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
    }
});

window.computeUsersStats = (users, progress, courses) => {
    //console.log(dataProgress['00hJv4mzvqM3D9kBy3dfxoJyFV82']);
    
    /* const users = dataUsers.map(dataUserusersWithStats => {
        stats: {
            percente: dataProgress[dataUserusersWithStats.id].intro.percent ;
            exercises:{
                total:;
                completed:;
                percent:;
            };
            reads:{
                total:;
                completed:;
                percent:;
            };
            quizzes:{
                total:;
                completed:;
                percent:;
                scoreSum:;
                scoreAvg:;
            };
        }
       /* const uObj ={};
       uObj[dataUser.id] = dataUser.name;
       return uObj;   
     
    }); 
}

function addCohorts(){
    const dataCohorts = JSON.parse(event.currentTarget.responseText);
    //console.log(dataCohorts[0]);
    
    for(var i=0;i<dataCohorts.length;i++){
        let option = document.createElement('option');
        option.setAttribute('value',dataCohorts[i].id)
        option.innerText += dataCohorts[i].id ;
        generacion.appendChild(option);
    }
} */