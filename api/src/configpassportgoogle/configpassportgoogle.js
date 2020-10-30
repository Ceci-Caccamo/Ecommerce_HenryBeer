const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const { User } = require('../db.js');

passport.serializeUser((user, done) => {
        done(null, user.id);
    });

passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user)=>{
            done(null, user);
        });
        
    });

passport.use(
    new GoogleStrategy({
        //opciones para entrar a la autenticación de google
        callbackURL: '/auth/google/verificado',
        clientID: '880118948373-ael4igsvhmjssb6qflr341rdgt45ct2f.apps.googleusercontent.com',
        clientSecret: '_aUb-ili-KGr5fKqi9-8tVbO'
    },(accesToken, refreshToken, profile, done)=> {
        //chequea si el usuario existe en la base de datos
        User.findOne({where:{googleId: profile.id}}).then((CurrentUser)=>{
            if(CurrentUser){
                //ya existe el usuario
                done(null, CurrentUser);

            }else{
                //sino existe el usuario, lo crea en la base de datos
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email: profile.email,
                }).save().then((newUser)=>{
                    done(null, newUser);
                })
            }
        })
    })
)