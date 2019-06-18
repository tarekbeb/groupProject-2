const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));










const port = 3000;
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var express = require('express');
var session = require('express-session');
// var bodyParser = require('body-parser');
var app = express();
// var bcrip = require('bcryptjs');
// var db = require('./models');
// var SequelizeStore = require('connect-session-sequelize')(session.Store);
// var localStrategy = require('passport-local').Strategy;
// var passport = require('passport');
// var bodyParser = require('body-parser');

//THREE PIECES NEED TO BE CONFIGURED TO USE PASSPORT FOR AUTHENTICATION
//authentication strategies
//application middleware
//sessions(optional)

//SETUP
// var myStore = new SequelizeStore({
//     db: db.sequelize 
// })

// app.use(session({
//     secret: 'dog eats cats',
//     resave: false,
//     proxy: true,
//     store: myStore
// }));

// myStore.sync(); 

//SETUP
app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use(passport.initialize());
// app.use(passport.session());

app.use(require('./routes/index'));
app.use(require('./routes/users'));


// app.use(bodyParser.urlencoded({extended: false}));


app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})