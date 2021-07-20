const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const pathTemplate = path.join(__dirname, '../templates/views');
const pathPartials = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views location
app.set('views', pathTemplate);
app.set('view engine', 'hbs');
hbs.registerPartials(pathPartials);

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

//application routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rythem Datta',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Rythem Datta',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Rythem Datta',
    msg: 'Help text',
  });
});
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rythem Datta',
    notFoundMessage: 'Help article not found',
  });
});

app.get('/weather', (req, res) => {
  var address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Please provide a address',
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecasrData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        console.log(location);
        console.log(forecasrData);
        res.send({
          address,
          location,
          forcast: forecasrData,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Rythem Datta',
    notFoundMessage: 'Page not Found',
  });
});

app.listen(port, () => {
  console.log('Server started at port no ' + port);
});
