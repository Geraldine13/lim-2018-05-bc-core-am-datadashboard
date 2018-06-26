const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const tblBody = document.getElementById('container-user');
let init = 0;
let final = 15;
function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
  xhr.onload = function () {
    const users = JSON.parse(event.currentTarget.responseText);
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
    xhrCohorts.onload = function () {
      const progress = JSON.parse(event.currentTarget.responseText);
      //computeUsersStats(users, progress);
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
   for (cohort of dataCohorts){
      if (cohort.hasOwnProperty('coursesIndex')) {
        if (cohort.id === generacion.value) {
           courses.push(Object.keys(cohort.coursesIndex).toString())
          //console.log(generacion.value)
        }
      }
   }
   
   //console.log((courses))
    const datos = computeUsersStats(users, progress, courses);
    users.length = 10;
    for (let i = 0; i < users.length; i++) {
      let tr = document.createElement('tr');
      let celda = document.createElement('td');
      let celda1 = document.createElement('td');
      let celda2 = document.createElement('td');
      let celda3 = document.createElement('td');
      let celda4 = document.createElement('td');
      let textoCelda = document.createTextNode(datos[i].stats.exercises.percent + '%');
      let t = document.createTextNode(users[i].name);
      const tCe = document.createTextNode(datos[i].stats.percent + '%')
      const tCe2 = document.createTextNode(datos[i].stats.reads.percent + '%')
      const tCe3 = document.createTextNode(datos[i].stats.quizzes.percent + '%')
      celda.appendChild(textoCelda);
      celda1.appendChild(t);
      celda2.appendChild(tCe);
      celda3.appendChild(tCe2);
      celda4.appendChild(tCe3);
      tr.appendChild(celda1);
      tr.appendChild(celda2);
      tr.appendChild(celda);
      tr.appendChild(celda3);
      tr.appendChild(celda4);
      tblBody.appendChild(tr);
    }

  })

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