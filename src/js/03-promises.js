import Notiflix from 'notiflix';

let delay = document.querySelector('input[name="delay"]');
let step = document.querySelector('input[name="step"]');
let amount = document.querySelector('input[name="amount"]');

const btnCreatePromise = document.querySelector('button[type="submit"]')

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);

  if (firstDelay < 0 || delayStep < 0 || amount.value <= 0) {
    Notiflix.Notify.info(`❌ Error! Number must be greater than 0!
      Incorrect parametrs: ${firstDelay}ms, ${delayStep}ms, ${amount.value} `       
    );
    return;
  } 
  
  for (let i = 0; i < amount.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});





// import Notiflix from 'notiflix';

// const delay = document.querySelector('input[name="delay"]');
// const step = document.querySelector('input[name="step"]');
// const amount = document.querySelector('input[name="amount"]');
// const btnCreatePromise = document.querySelector('button[type="submit"]')

// function createPromise(position, delay) {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         // Fulfill
//         resolve({ position, delay });
//       } else {
//         // Reject
//         reject({ position, delay });
//       }
//     }, delay);
//   });
//   return promise;
// }

// btnCreatePromise.addEventListener('click', e => {
//   e.preventDefault();
//   let firstDelay = Number(delay.value);
//   let delayStep = Number(step.value);
//   for (let i = 0; i < amount.value; i++) {
//     createPromise(1 + i, firstDelay + i * delayStep)
//       .then(({ position, delay }) => {
//         Notiflix.Notify.success(
//           `✅ Fulfilled promise ${position} in ${delay}ms`
//         );
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.Notify.failure(
//           `❌ Rejected promise ${position} in ${delay}ms`
//         );
//       });
//   }
// });

    
      
    
