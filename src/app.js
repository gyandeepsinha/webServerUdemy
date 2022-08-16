const express       =   require('express');
const path          =   require('path');
const hbs           =   require('hbs');
const utilFunction  =   require('./utils/utils');
const app           =   express();

const fullDirectoryPath =    path.join(__dirname, '../public');
const viewPath          =    path.join(__dirname, '../templates/views');
const partialPath       =    path.join(__dirname, '../templates/partials');

app.use(express.static(fullDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.get('', (req, res) =>{
    res.render('index', 
    {
        'title':'Weather App Index Page'
    });
});

app.get('/about', (req, res) =>{
    res.render('about', {
        'title': 'About',
        'about': 'NodeJs Developer'
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        'title': 'Help',
        'page' : ' help page',
        'description': 'What we can do for you?'
    });
});

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide location'
        });
    }
    utilFunction.weatherData(req.query.address, (error, weatherData) =>{
        if(error){
          return  res.send({error})
        }
        return res.send(weatherData);
    });
});

app.get('/help/*', (req, res) =>{
    res.render('404', {
        'description' : 'Opps! The help article is not found'
    });
});

app.get('*', (req, res) =>{
    res.render('404', {
        'description' : 'Opps! We have not developed it yet'
    });
});

app.listen(3000, () => {
    console.log('The server is running on 3000!');
});