const p = new Promise(function (resolve, reject) {
  //kick off some async work
  setTimeout(() => {
    resolve(1);
    reject(new Error('some error message'))
  }, 1000)


  // reject(new Error('message'))
});

//consume promise
p
  .then(resultFromResolve => console.log('resultFromResolve', resultFromResolve))
  .catch(err => console.log(err.message))