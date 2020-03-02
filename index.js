const express = require('express');
const app = express();
const path = require('path');

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

const apiData = require('./people.json');

//give access to apiData
app.get('/people', (req,res,)=>{
  res.json(apiData);
});

//Commenting out this part after setting route for public folder files.
// app.get('/', (req, res)=> res.send('Hello World!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
