
const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const table = document.getElementById('container-user');
//obteniendo data users
function getUser(){
    
    const xhr = new XMLHttpRequest();
        xhr.open('GET',`../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
        xhr.onload = addUser;
        xhr.onerror = handleError;
        xhr.send();
}

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
                        function percent(){
                            const objUser = dataProgress[user.id].intro;
                            if(objUser.hasOwnProperty('percent')) {
                                console.log(dataProgress[user.id].intro.percent)
                            }
                        }
                        if(user.signupCohort === 'lim-2018-03-pre-core-pw'){
                            //console.log(dataProgress[user.id].intro.percent)
                            const obj = {
                                percent: percent()
                            };
                            return obj;
                        }
                        /*  */
                    });
                //console.log(users);
                }
                computeUsersStats()
            }
            xhrCohorts.onerror = handleError;
            xhrCohorts.send(); 
        };
        xhr.onerror = handleError;
        xhr.send();
} // 
//obteniendo data cohorts
function getCohorts(){
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts.json`);
    xhrCohorts.onload = addCohorts;
    xhrCohorts.onerror = handleError;
    xhrCohorts.send(); 
}
//obteniendo data progress
function getProgress(){
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
    xhrCohorts.onload = addProgress;
    xhrCohorts.onerror = handleError;
    xhrCohorts.send(); 
}
function handleError(){
    console.log('se ha presentado un error');
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
     
    }); */
}

li.addEventListener('click', function(e){
    generacion.innerHTML = '';
    getCohorts();
});
function addCohorts(){
    const dataCohorts = JSON.parse(event.currentTarget.responseText);
    //console.log(dataCohorts[0]);
    
    for(var i=0;i<dataCohorts.length;i++){
        let option = document.createElement('option');
        option.setAttribute('value',dataCohorts[i].id)
        option.innerText += dataCohorts[i].id ;
        generacion.appendChild(option);
    }
}