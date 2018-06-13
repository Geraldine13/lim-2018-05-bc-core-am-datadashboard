const xhr = new XMLHttpRequest();
xhr.open('GET',`../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
xhr.onload = addUser;
xhr.onerror = handleError;
xhr.send();


 
function handleError(){
    console.log('se ha presentado un error');
}

function addUser(){
    const data = JSON.parse(xhr.responseText);
    console.log(data[0]);
    
}