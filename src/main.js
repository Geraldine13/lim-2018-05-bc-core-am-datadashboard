const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const tblBody = document.getElementById('container-user');
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
function getCohorts() {
  const xhrCohorts = new XMLHttpRequest();
  xhrCohorts.open('GET', `../data/cohorts.json`);
  xhrCohorts.onload = addCohorts;
  xhrCohorts.onerror = handleError;
  xhrCohorts.send();
}
function addUser(users, progress) {
  const datos = computeUsersStats(users, progress);
  users.length = 10;
  for (let i = 0; i < users.length; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 1; j++) {
      let celda = document.createElement('td');
      let celda1 = document.createElement('td');
      let celda2 = document.createElement('td');
      let textoCelda = document.createTextNode(datos[i].stats.exercises.percent + '%');
      let t = document.createTextNode(users[i].name);
      const tCe = document.createTextNode(datos[i].stats.percent + '%')
      celda.appendChild(textoCelda);
      celda1.appendChild(t);
      celda2.appendChild(tCe);
      tr.appendChild(celda1);
      tr.appendChild(celda2);
      tr.appendChild(celda);
    }
    tblBody.appendChild(tr);
  }
}
function addCohorts() {
  const dataCohorts = JSON.parse(event.target.responseText);
  query = li.value;
  console.log(query)
  let filterse = query => {
    return dataCohorts.filter(sede => sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }
  console.log(filterse(query))
  const courses = dataCohorts.map(cohort => {
    let ar = [];
    if (cohort.hasOwnProperty('coursesIndex')) {
      Object.keys(cohort.coursesIndex).map(course => {
        ar.push(cohort.coursesIndex[course].title);
      })
    }
    return ar;
  })
  for (i in dataCohorts) {
    let option = document.createElement('option');
    option.setAttribute('value', dataCohorts[i].id)
    option.innerText += dataCohorts[i].id;
    generacion.appendChild(option);
  }
  generacion.addEventListener('change', function (e) {
    if (generacion.value === 'lim-2018-03-pre-core-pw') {
      tblBody.innerHTML = '';
      getUsers();
    } else {
      tblBody.innerHTML = 'no hay datos para mostrar';
    }
  });
}
li.addEventListener('click', function (e) {
  e.preventDefault();
  generacion.innerHTML = '';
  getCohorts();
});
