const express   =   require('express');
const path      =   require('path');
const hbs       =   require('hbs');
const app       =   express();

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
        'title': 'Weather App',
        'about': 'NodeJs Developer'
    });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        'title': 'Weather App',
        'page' : ' help page',
        'description': 'What we can do for you?'
    });
});

app.get('/weather', (req, res) =>{
    res.send({weather:'good', location:'surat'});
});

app.listen(3000, () => {
    console.log('The server is running on 3000!');
});