window.computeUsersStats = (users, progress) => {
  const usersWithStats = users.map(user => {
    const percentProgress = () => {
      const percent = [];
      Object.keys(progress[user.id]).map(course => {
        if (progress[user.id][course].hasOwnProperty('percent')) {
          percent.push(progress[user.id][course].percent);
        }
      });
      if (percent[0] === undefined) {
        return percent[0] = 0;
      } else {
        return percent[0];
      }
    }
    const exercisesTotal = () => {
      const total = [];
      Object.keys(progress[user.id]).map(course => {
        Object.keys(progress[user.id][course].units).map(leccion => {
          Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
            if (progress[user.id][course].units[leccion].parts[lectura].hasOwnProperty('exercises')) {
              total.push(Object.values(progress[user.id][course].units[leccion].parts[lectura].exercises).length);
            }
          })
        })
      });
      if (total[0] === undefined) {
        return total[0] = 0;
      } else {
        return total[0];
      }
    }
    const exercisesCompleted = () => {
      const completed = [];
      const initial = 0; 
      Object.keys(progress[user.id]).map(course => {
        Object.keys(progress[user.id][course].units).map(leccion => {
          Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
            if (progress[user.id][course].units[leccion].parts[lectura].hasOwnProperty('exercises')) {
              Object.keys(progress[user.id][course].units[leccion].parts[lectura].exercises).map(exercise => {                      
                if(progress[user.id][course].units[leccion].parts[lectura].exercises[exercise].hasOwnProperty('completed')){
                  completed.push(progress[user.id][course].units[leccion].parts[lectura].exercises[exercise].completed);
                }
              })
            }
          })
        })
      });
        return completed.reduce((a,b) => a+b,initial)
    }
    const percentExercises = () =>{
      let percent = 0;
      if(exercisesTotal() === 0) {
        return percent = 0;
      } else {
        return percent = (exercisesCompleted() * 100 ) / exercisesTotal();
      }
    }
    const stats = {
      stats:{
      percent: percentProgress(),
      exercises: {
        total: exercisesTotal(),
        completed: exercisesCompleted(),
        percent: percentExercises(),
      }
    }
  };
    return stats;
  });
  //console.log(usersWithStats)
  return usersWithStats;
}
