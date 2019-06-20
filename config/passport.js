const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = required('../models')



module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      //MATCH USER
      //FINDS IF EMAIL MATCHES EMAIL
      db.user.findOne({email: email})
      .then(user => {
        if (!user) {//IF NO USER--OR NO MATCH RETURN DONE AND NULL FOR THE USER
          return done(null, false, { message: 'That email is not registered' });
        }

        //MATCH PASSWORD
        //TAKES PASSWORD FROM LOCALSTRATEGY AND THE USER.PASSWORD WHICH IS THE HASH PASSWORD FROM DB
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          //IF USER IS MATCHED RETURN NULL AND THE USER FOR THE USER FROM THE DONE FUNCTION
          if (isMatch) { 
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );


  //SESSIONS TO SERIALIZE AND DESERIALIZE
  //DOCUMENTATION
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.user.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

