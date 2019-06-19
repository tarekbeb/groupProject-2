var express = require('express');
var session = require('express-session');
let app = express();
var db = require('./models');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');

// THREE PIECES NEED TO BE CONFIGURED TO USE PASSPORT FOR AUTHENTICATION
// authentication strategies
// application middleware
// sessions(optional)

//SETUP
var myStore = new SequelizeStore({
    db: db.sequelize 
})

app.use(session({
    secret: 'dog eats cats',
    resave: false,
    proxy: true,
    store: myStore
}));

myStore.sync(); 

//SETUP
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

//CONNECT FLASH
app.use(flash());

app.use(function(req, res, next){
    res.locals.error_msg = req.flash('error_msg');
    next();
})

// app.use(passport.initialize());
// app.use(passport.session());

app.get('/', (req, res) => {
    res.send('index');
})


app.use(require('./routes/index'));
app.use(require('./routes/users'));


// app.use(bodyParser.urlencoded({extended: false}));


const port = 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${3000}`);
})