const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require('./models/Person');

passport.use(new localStrategy(
    async (userName, password, done)=> {
        try{ 
            const user = await person.findOne({username: userName});
            if(!user)
                return done(null, false, {message: 'Incorrect username'});
             const isPasswordMatched = await user.comparePassword(password);
             if(isPasswordMatched)
             return done(null, user); 
            else
             return done(null, false, {message: 'Incorrect password'});
        }catch(err){
          return  done(err); 
        }
    }))

    module.exports = passport;