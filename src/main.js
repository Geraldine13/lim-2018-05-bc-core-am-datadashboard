let sedeSelect = document.getElementById('selectSede');
let program = document.getElementById('program');

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
  console.log('Se ha presentado un error');
}

//obteniendo data cohorts
const baseCohorts = `../data/cohorts.json`;

function getCohorts(callback) {
  const xhrCohorts = new XMLHttpRequest();
  xhrCohorts.open('GET', baseCohorts);
  xhrCohorts.onload = callback;
  xhrCohorts.onerror = handleError;
  xhrCohorts.send();
}

function filterSelect() {
  getCohorts((e) => {
    const dataCohorts = JSON.parse(e.target.responseText);

    const filterItems = query => {
      return dataCohorts.filter(sede => {
        return sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1
      });
    }

    sedeSelect.addEventListener('click', function (e) {
      e.preventDefault();

      let index = e.target.id;
      const dataFilter = filterItems(index);

      let s = query => {
        return dataFilter.filter(programa => {
          return programa.id.toLowerCase().indexOf(query.toLowerCase()) > -1
        });
      }

      program.addEventListener('change', function (e) {
        e.preventDefault();

        let valueProgram = e.target.value;
        let endFilter = s(valueProgram);

        for (i in endFilter) {
          let option = document.createElement('option');
          option.setAttribute('value', endFilter[i].id)
          option.innerText += endFilter[i].id;
          generacion.appendChild(option);
        }
      });
    });
  });
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
    // users.length = 10;
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
function filterSelect() {
  getCohorts((e) => {
    const dataCohorts = JSON.parse(e.target.responseText);

    const filterItems = query => {
      return dataCohorts.filter(sede => {
        return sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1
      });
    }

    sedeSelect.addEventListener('click', function (e) {
      e.preventDefault();
      let index = e.target.id;
      const dataFilter = filterItems(index);
      let s = query => {
        return dataFilter.filter(programa => {
          return programa.id.toLowerCase().indexOf(query.toLowerCase()) > -1
        });
      }

      program.addEventListener('change', function (e) {
      // generacion.innerHTML = '';
        let valueProgram = program.value;
        let endFilter = s(valueProgram);
        for (i in endFilter) {
          let option = document.createElement('option');
          option.setAttribute('value', endFilter[i].id)
          option.innerText = endFilter[i].id;
          generacion.appendChild(option);
        }
      });
      generacion.addEventListener('change', function (e) {
        if (generacion.value === 'lim-2018-03-pre-core-pw') {
          tblBody.innerHTML = '';
          getUsers();
        } else {
          tblBody.innerHTML = 'no hay datos para mostrar';
        }
      });
    });
  });
}

filterSelect()
getCohorts()