const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
let db = require('../models');




passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
  console.log("I'm in passport");

  db.user.findAll({where: {email: email}})
  .then((results) => {
      if(results != null){
          let record = results[0];
          //right now the password is encrypted
          //bcrip will compare the user input password to the database password
          bcrypt.compare(password, record.password, (error, response) => {
              if(response){ 
                  console.log('password matched');
                  //serialize user gets called
                  done(null, {id: record.id, email: record.email})
              } else {
                  console.log('password not matched ');
                  done(null, false);
              }
          })
      } else {
          console.log('just out there');
          done(null, false);
      }
  })
}))
//~~~~~~~~~~~~~~~~~
  // passport.use(
  //   new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  //     //MATCH USER
  //     //FINDS IF EMAIL MATCHES EMAIL
  //     db.user.findAll({where: { email: email }})
  //     .then(user => {
  //       if (!user) {//IF NO USER--OR NO MATCH RETURN DONE AND NULL FOR THE USER
  //         return done(null, false, { message: 'That email is not registered' });
  //       }
  //       //MATCH PASSWORD
  //       //TAKES PASSWORD FROM LOCALSTRATEGY AND THE USER.PASSWORD WHICH IS THE HASH PASSWORD FROM DB
  //       bcrypt.compare(password, user.password, (error, response) => {
  //         if(response){
  //           console.log('password matched');
  //           done(null, {id: user.id, username: user.username})
  //         } else {
  //           console.log('password not matched')
  //           done(null, false);
  //         }
  //         // if (error) throw error;
  //         // //IF USER IS MATCHED RETURN NULL AND THE USER FOR THE USER FROM THE DONE FUNCTION
  //         // if (response) { 
  //         //   return done(null, user);
  //         // } else {
  //         //   return done(null, false, { message: 'Password incorrect' });
  //         // }
  //       })
  //     });
  //   })
  // );
//~~~~~~~~~~~~~~~~`

  //SESSIONS TO SERIALIZE AND DESERIALIZE
  //DOCUMENTATION
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.user.findByPk(id, function(err, user) {
      done(err, user);
    });
  });


