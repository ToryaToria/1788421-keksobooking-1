fetch(
  'https://32.javascript.htmlacademy.pro/code-and-magick/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => response.json())
  .then((data) => {
    console.log('Результат', data);
  })
  .catch((err) => {
    console.error(err);
  });


//   const data = new FormData();
//   data.append('username', 'keks')
// fetch(
//   'https://32.javascript.htmlacademy.pro/code-and-magick',
//   {
//     method: 'POST',
//     credentials: 'same-origin',
//     body: data,
//   },
// )
// .then((response) => {
//   if (response.ok) {
//     return response.json();
//   }

//   throw new Error(`${response.status} ${response.statusText}`);
// })
// .then((data) => {
//   console.log('Результат', data);
// })
// .catch((err) => {
//   console.error(err);
// });


const createLoader = (onSuccess, onError) => () => fetch(
  'https://32.javascript.htmlacademy.pro/code-and-magick/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

// export {createLoader};

const loadAnimals = createLoader(console.log, console.error);

loadAnimals();