window.computeUsersStats = (users, progress, courses) => {
  //console.log(courses)
  const usersWithStats = users.map(user => {
    const percentProgress = () => {
      const percent = [];
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          if (progress[user.id][course].hasOwnProperty('percent')) {
            percent.push(progress[user.id][course].percent);
          }
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
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].hasOwnProperty('exercises')) {
                total.push(Object.values(progress[user.id][course].units[leccion].parts[lectura].exercises).length);
              }
            })
          })
        }

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
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].hasOwnProperty('exercises')) {
                Object.keys(progress[user.id][course].units[leccion].parts[lectura].exercises).map(exercise => {
                  if (progress[user.id][course].units[leccion].parts[lectura].exercises[exercise].hasOwnProperty('completed')) {
                    completed.push(progress[user.id][course].units[leccion].parts[lectura].exercises[exercise].completed);
                  }
                })
              }
            })
          })
        }

      });
      return completed.reduce((a, b) => a + b, initial)
    }
    const percentExercises = () => {
      let percent = 0;
      if (exercisesTotal() === 0) {
        return percent = 0;
      } else {
        return percent = (exercisesCompleted() * 100) / exercisesTotal();
      }
    }
    const totalReads = () => {
      const total = [];
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'read') {
                total.push(progress[user.id][course].units[leccion].parts[lectura].type)
              }
            })
          })
        }
      });
      return total.length;
    }
    const completedReads = () => {
      const completed = [];
      const initial = 0;
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'read') {
                completed.push(progress[user.id][course].units[leccion].parts[lectura].completed)
              }
            })
          })
        }
      });
      return completed.reduce((a, b) => a + b, initial);
    }
    const percentReads = () => {
      let percent = 0;
      if (totalReads() === 0) {
        return percent = 0;
      } else {
        return percent = Math.round((completedReads() * 100) / totalReads());
      }
    }
    const totalQuizzes = () => {
      const total = [];
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'quiz') {
                total.push(progress[user.id][course].units[leccion].parts[lectura].type)
              }
            })
          })
        }
      });
      return total.length;
    }
    const completedQuizzes = () => {
      const completed = [];
      const initial = 0;
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'quiz') {
                completed.push(progress[user.id][course].units[leccion].parts[lectura].completed)
              }
            })
          })
        }
      });
      return completed.reduce((a, b) => a + b, initial);
    }
    const percentQuizzes = () => {
      let percent = 0;
      if (totalQuizzes() === 0) {
        return percent = 0;
      } else {
        return percent = Math.round((completedQuizzes() * 100) / totalQuizzes());
      }
    }
    const scoreSumQuizzes = () => {
      const scoreSum = [];
      const initial = 0;
      courses.map(course => {
        if (progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'quiz') {
                if(progress[user.id][course].units[leccion].parts[lectura].score !== undefined){
                  scoreSum.push(progress[user.id][course].units[leccion].parts[lectura].score)
                }
              }
            })
          })
        }
      });
      return scoreSum.reduce((a, b) => a + b,initial);
    }
    const stats = {
      stats: {
        percent: percentProgress(),
        exercises: {
          total: exercisesTotal(),
          completed: exercisesCompleted(),
          percent: percentExercises(),
        },
        reads: {
          total: totalReads(),
          completed: completedReads(),
          percent: percentReads(),
        },
        quizzes: {
          total: totalQuizzes(),
          completed: completedQuizzes(),
          percent: percentQuizzes(),
          scoreSum: scoreSumQuizzes(),
          scoreAvg: 29,
        }
      }
    };
    return stats;
  });
  console.log(usersWithStats)
  return usersWithStats;
}