const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const {Extractjwt} = require('passport-jwt');
const User = require('./models/users');
const JWT_SECRET = 'secret';

const options ={
    jwtFromRequest:Extractjwt.fromAuthHeaderAsBearerToken();
    secretOrkey: JWT_SECRET
}

passport.use(new JWTStrategy(
    options,
    async (jwtPayload, done) => {
        try{
            const User = await User.findBYpk(jwtPayload.id);
            
            if(User){
                return done(null, User);
            }else{
                return done(null, false);
            }
        }catch(error){
            console.log('Error finding the user from JWT', error);
            return done(null,false)
        }
    }
));

module.exports = passport;