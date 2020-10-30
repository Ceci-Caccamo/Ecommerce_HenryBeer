const server = require('express').Router();
const passport = require('passport');

//autenticación con google
server.get('/google', passport.authenticate('google',{
    scope:['profile','email']
})); 

//callback para rutas redirigidas
server.get('/google/verificado', passport.authenticate('google'), (req, res)=> {
    //res.send('esta siendo redirigido')
    res.redirect('http://localhost:3000/' +req.user.id);
});

module.exports = server;