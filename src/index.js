const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Initiliazations 
const app = express();
require('./database');

//Settings
app.set('PORT', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.engine('.hbs', exphbs({ --> Este era el cóigo real, pero se cambio por la siguiente linea.
app.engine('.hbs', exphbs.engine({
    defaultLayouts: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:  path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'proyectofinal',
    resave: true,
    saveUninitialized: true
}));

//app.use('/public',express.static(path.join(__dirname, 'public')));

//Global Variables
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Server is listenning
app.listen(app.get('PORT'), () => {
    console.log('Servidor en puerto', app.get('PORT'))
})