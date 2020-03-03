const express = require('express');
const app = express();
const path = require('path');

//JSON schemas (Mockaroo data files)
const apiData = require('./people.json');
const apiData1 = require('./cars.json');

const port = 3000;

app.use((req, res, next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();
});

//Setting path routes
app.use(express.static('public')); // All files from public folder must be included.
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));



// set the route for index.html
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + 'public/index.html'));
});

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + 'public/about.html'));
});

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + 'public/contact.html'));
});



//give access to apiData (Mockaroo JSON files)
app.get('/people', (req,res)=>{
  res.json(apiData);
}); // people ends here

app.get('/cars', (req,res)=>{
  res.json(apiData1);
});   // cars ends here


//Filtering gender data from people JSON file
app.get('/gender/g=:gender',(req,res)=>{
  const genderParam = req.params.gender; //retrieves the parameter value requested by the user
  if ((genderParam === 'male') || (genderParam === 'female')){
    let filteredArray = [];//array to push the matching objects to user's value
    for (let i = 0; i < apiData.length; i++) {
      if (genderParam === apiData[i].gender.toLowerCase()){
        filteredArray.push(apiData[i]);
      }
    }
    res.send(filteredArray);
  } else {
    res.send('Invalid parameter');
  }
});

// // Accessing car owners data common between people & cars based on first_name
// app.get('apiData1/car_owner=:first_name/car_make=:car_owns', (req, res)=>{
//   const nameParam = req.params.first_name;
//   const carParam = req.params.car_owns;
//
//   let filteredArray = [];
//   for(let i = 0; i < apiData1.length; i++) {
//     if ((nameParam.toLowerCase() === apiData1[i].first_name.toLowerCase()) && (carParam.toLowerCase() === apiData1[i].car_make.toLowerCase())) {
//       filteredArray.push(apiData1[i]);
//     }
//   }
//   res.send(filteredArray);
// });

// Car Make and Car Modal Year Filter
app.get('/q=:query1&q=:query2', (req,res) =>{
    const first_nameParam = req.params.query1.toLowerCase();
    const car_makeParam = req.params.query2.toLowerCase();
        var filteredArray = [];
        for (var i = 0; i < apiData1.length; i++) {
            if ((first_nameParam === apiData1[i].first_name.toLowerCase()) && (car_makeParam == apiData1[i].car_make.toLowerCase())){
                filteredArray.push(apiData1[i]);
            }
        }
        if (filteredArray.toString() === '') {
            res.send('Invalid parameter');
        } else {
            res.send(filteredArray);
        }
});


// if ((userinput1 = jsondata1) && (userinput2 = jsondata2)) {
//
// }

//Commenting out this part after setting route for public folder files.
// app.get('/', (req, res)=> res.send('Hello World!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
