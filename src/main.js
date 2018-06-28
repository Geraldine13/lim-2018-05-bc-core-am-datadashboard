const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const tblBody = document.getElementById('container-user');
const stringSearch = document.getElementById('search');
const searchBtn = document.getElementById('btnsearch');
const selectOrderDirection = document.getElementById('orderDirection');
const selectOrderBy = document.getElementById('orderBy');
const ordenar = document.getElementById('ordenar')

var currentDiv = document.getElementById("div1"); 

let options = {
  cohort:'',
  cohortData:{
    users: [],
    progress:{}
  },
  orderBy: '',
  orderDirection: '',
  search: '',

}
function pasarDatos(users,progress,cohortSelect) {
  options.cohort = cohortSelect[0];
  options.cohortData.users = users;
  options.cohortData.progress = progress;
  options.orderBy = orderBy.value;
  options.orderDirection = orderDirection.value;
  options.search = stringSearch.value;
  console.log(options);
  
 const data = processCohortData(options);
 console.log(data);
 
  dataTable(data)
  ordenar.addEventListener('click', function () {
    const orderDirection = selectOrderDirection.value;
    console.log(orderDirection);
    const orderBy = selectOrderBy.value;
    console.log(orderBy);
   const userOrder = sortUsers(data, orderBy, orderDirection);
   console.log(userOrder);
   
   currentDiv.innerHTML = '';
  dataTable(userOrder);

  })
  stringSearch.addEventListener('keyup', function () {
    const search = stringSearch.value;
    console.log(search);
    const userfilter = filterUsers(data, search);
    currentDiv.innerHTML = '';
    dataTable(userfilter);
  })
}
function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
  xhr.onload = function () {
    const usersData = JSON.parse(event.currentTarget.responseText);
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
    xhrCohorts.onload = function () {
      const progress = JSON.parse(event.currentTarget.responseText);
      const users = [];
      usersData.map(user => {
        if (generacion.value === user.signupCohort) {
          users.push(user);
        }
      })      
     addUser(users, progress)     
    }
    xhrCohorts.onerror = handleError;
    xhrCohorts.send();
  };
  xhr.onerror = handleError;
  xhr.send();
}
 function handleError() {
  console.log('se ha presentado un error');
}
//obteniendo data cohorts
function getCohorts(callback) {
  const xhrCohorts = new XMLHttpRequest();
  xhrCohorts.open('GET', `../data/cohorts.json`);
  xhrCohorts.onload = callback;
  xhrCohorts.onerror = handleError;
  xhrCohorts.send();
}
function addUser(users, progress) {
  getCohorts(() => {
    const dataCohorts = JSON.parse(event.target.responseText);
    const courses = [];
    const cohortSelect = [];
    for (cohort of dataCohorts) {
      //if (cohort.hasOwnProperty('coursesIndex')) {
        if (cohort.id === generacion.value) {
         // courses.push(Object.keys(cohort.coursesIndex).toString())
          //console.log(generacion.value)
          cohortSelect.push(cohort);
        }
      //}
    }
    console.log(cohortSelect);
    
    //console.log((courses))
   // const datos = computeUsersStats(users, progress, courses);
   pasarDatos(users,progress,cohortSelect);   
  })

}

function dataTable(datos){
 // datos.length = 10;
    for (let i = 0; i < datos.length; i++) {
      var newDiv = document.createElement("div"); 
      var newContent = document.createTextNode(datos[i].name); 
      newDiv.appendChild(newContent); //añade texto al div creado. 
      // añade el elemento creado y su contenido al DOM 
      currentDiv.appendChild(newDiv)
      // document.body.insertBefore(newDiv, currentDiv);
      /* let tr = document.createElement('tr');
      let celdaName = document.createElement('td');
      let celdaProgressPercent = document.createElement('td');
      let celdaExercisesPercent = document.createElement('td');
      let celdaReadsPercent = document.createElement('td');
      let celdaQuizzesPercent = document.createElement('td');
      let textName = document.createTextNode(datos[i].name);
      const textProgress = document.createTextNode(datos[i].stats.percent + '%')
      let textExercises = document.createTextNode(datos[i].stats.exercises.percent + '%');
      const textReadsPercent = document.createTextNode(datos[i].stats.reads.percent + '%')
      const textQuizzesPercent = document.createTextNode(datos[i].stats.quizzes.percent + '%')
      celdaName.appendChild(textName);
      celdaProgressPercent.appendChild(textProgress);
      celdaExercisesPercent.appendChild(textExercises);
      celdaReadsPercent.appendChild(textReadsPercent);
      celdaQuizzesPercent.appendChild(textQuizzesPercent);
      tr.appendChild(celdaName);
      tr.appendChild(celdaProgressPercent);
      tr.appendChild(celdaExercisesPercent);
      tr.appendChild(celdaQuizzesPercent);
      tr.appendChild(celdaReadsPercent);
      tblBody.appendChild(tr); */
    }
}

function addCohorts() {
  const dataCohorts = JSON.parse(event.target.responseText);

  for (i in dataCohorts) {
    let option = document.createElement('option');
    option.setAttribute('value', dataCohorts[i].id)
    option.innerText += dataCohorts[i].id;
    generacion.appendChild(option);
  }
  generacion.addEventListener('change', function (e) {
    //console.log(generacion.value)
    if (generacion.value === 'lim-2018-03-pre-core-pw') {
      tblBody.innerHTML = '';
      getUsers();
    } else {
      tblBody.innerHTML = 'no hay datos para mostrar';
      getUsers();
    }
  });
}
li.addEventListener('click', function (e) {
  e.preventDefault();
  generacion.innerHTML = '';
  getCohorts(addCohorts);
});