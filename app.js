var express = require('express');
var session = require('express-session');
var db = require('./models');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
let app = express();
const port = 3000;


// THREE PIECES NEED TO BE CONFIGURED TO USE PASSPORT FOR AUTHENTICATION
// authentication strategies
// application middleware
// sessions(optional)

//SETUP
var myStore = new SequelizeStore({
    db: db.sequelize 
})

//EXPRESS BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));

//EXPRESS SESSION
app.use(session({
    secret: 'dog eats cats',
    resave: false,
    saveUninitialized: true
    // store: myStore
}));

myStore.sync(); 

//SETUP
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

//CONNECT FLASH
//GLOBAL VARIABLES
app.use(flash());
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error_msg = req.flash('error'); //FOR THE LOGIN ERROR
    next();
})

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
// app.use(require('./config/passport'));

app.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
})

//ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/newProject'))
app.use(require('./routes/ideas'))
app.use(require('./routes/ideaPage'))
app.use(require('./routes/userProfile'))


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})