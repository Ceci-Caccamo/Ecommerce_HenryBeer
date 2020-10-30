require("dotenv").config();
const server = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {verifyToken} = require('../middleware/authentication')
const { SIGNATURE, CLIENT_ID } = process.env;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('880118948373-ael4igsvhmjssb6qflr341rdgt45ct2f.apps.googleusercontent.com');


// Modelo user
const { User } = require("../db");

 

server.get('/me', verifyToken, (request, response) => {
 console.log(request.user)
  const { userID } = request.user;
 
  User.findOne({
    where: {
      id: userID
    }
  })
    .then(user => {
      return response.json({
        user
      });
    })
    .catch(error => {
      return response.status(400).json({
        error: error.message
      });
    })

});


server.get('/me/google', verifyToken, (request, response) => {
  console.log(request.user)
   const { id_user } = request.user;
  
   User.findOne({
     where: {
       id: id_user
     }
   })
     .then(user => {
       return response.json({
         user
       });
     })
     .catch(error => {
       return response.status(400).json({
         error: error.message
       });
     })
 
 });
 


// Login: Normal
server.post("/login", (request, response) => {
  const { email, password } = request.body;

  // Buscar usuario
  User.findOne({
    where: {
      email,
    },
  })
    .then((user) => {
      // Verifico que el usuario existe y comparo las contraseñas
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return response.status(400).json({
          error: "Usuario o contraseña incorrectos.",
        });
      }

      //Genero el token
      const token = jwt.sign(
        {
          user: {
            userID: user.id,
            mail: user.email,
            username: user.username,
            admin: user.isAdmin,
            password: user.password,
          },
        },
        SIGNATURE,
        { expiresIn: 60 * 60 * 24 }
      );

      // Devolver el token
      return response.status(200).json({
        id: user.id,
        isAdmin: user.isAdmin,
        mensaje: "Token generado",
        token,
      });
    })
    .catch((error) => {
      // Se rompio el servidor
      return response.status(500).json({
        error: error.message,
      });
    });
});

/* Crear Ruta para password reset

  POST /users/:id/passwordReset */

server.put("/:id/passwordReset", async (req, res) => {
  const id = req.params.id;
  const password = rep.body.password;
  const user = await User.findByPk(id);
  if (user) {
    user.password = password || user.password;
    const updatedPass = await user.save();
    res.send({
      password: updatedPass.password,
    });
    alert("Pass actualizada");
  } else {
    res.status(404).send({ message: "La pass no se actualizo" });
  }
});

//suposicion1
server.patch('/reset', async (req, res) => {
	const {email, password, token} = req.body;

	if (!email || !password || !token) return res.status(400).send('Faltan parámetros');

	try {
		const user = await User.findOne({where: {email, forgotPasswordToken: token}});
		if (!user) return res.status(400).send('Token inválida');

		user.password = password;
		user.forgotPasswordToken = null;
		await user.save();

		return res.status(200).send('Contraseña actualizada con éxito');
	} catch (error) {
		res.status(500).send(error);
	}
});
/* 
//https://meanstackdeveloper.in/implement-reset-password-functionality-in-node-js-express.html
server.post("/:id/passwordReset", function (req, res) {
  const id = req.params.id;
  User.findOne({
    where: { id: userId },
  }).then(function (user) {
    if (!user) {
      return { mesagge: "No user found with that email eireccion_envio." };
    }
    ResetPassword.findOne({
      where: { userId: user.id, status: 0 },
    }).then(function (resetPassword) {
      if (resetPassword)
        resetPassword.destroy({
          where: {
            id: resetPassword.id,
          },
        });
      token = crypto.randomBytes(32).toString("hex");
      bcrypt.hash(token, null, null, function (err, hash) {
        ResetPassword.create({
          userId: user.id,
          resetPasswordToken: hash,
          expire: moment.utc().add(config.tokenExpiry, "seconds"),
        });
      });
    });
  });
});
 */
server.put('/promote/:id', (req, res)=> {
  const id = req.params.id

  User.update({isAdmin:true}, {
  where:{
    id: req.params.id
  }
})
 User.findByPk(id) 
 .then(adminNuevo=>{
 return res.status(201).send({message:"nuevo admin"+id, adminNuevo});
  })
  .catch(error=> {
    console.log(error);
 res.status(400).send(error);
  })
})

server.put('/change/:id', (req, res)=> {
  const id = req.params.id

  User.update({isAdmin:false}, {
  where:{
    id: req.params.id
  }
})
 User.findByPk(id) 
 .then(noEsAdmin=>{
 return res.status(201).send({message:"se quito el permiso con exito"+id, noEsAdmin});
  })
  .catch(error=> {
    console.log(error);
 res.status(400).send(error);
  })
})




// Validar token de google
async function verify(token) {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  });

  const payload = ticket.getPayload();

  // Nuevo user
  return {
    name: payload.email.split('@')[0],
    email: payload.email,
    image: payload.picture,
    google: true
  }

}




// Login with Google
server.post('/google', async (req, res) => {

  const token = req.body.token;

  const googleUser = await verify(token)
    .catch(error => {
      return res.status(403).json({
        error: error.message
      });
    })


  User.findOne({
    where: {
      email: googleUser.email
    }
  })
    .then(user => {

      // Verificar que el usuario existe en la BD.
      if (user) {

        // Si el user se autentico con Login normal
        if (!user.google) {

          return res.status(400).json({
            message: 'Debes usar su autenticacion normal.'
          });

        } else {
          // Generar el token
          const token = jwt.sign({
            user: {
              id_user: user.id,
              mail: user.email,
              name: user.name,
              admin: user.isAdmin,
              google: user.google
            }
          }, SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 })

          // usuario logueado con google, retornar token
          return res.status(200).json({
            user: user,
            token
          });

        }

      } else {

        // Si el usuario no existe en la BD agregarlo y devolver token
        User.create({
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.image,
          google: true,
          password: 'random-password'
        })
          .then(userCreated => {

            // Generar token del userGoogle
            const token = jwt.sign({
              user: {
                id_user: userCreated.id,
                mail: userCreated.email,
                name: userCreated.name,
                admin: userCreated.isAdmin,
                google: userCreated.google
              }
            }, SIGNATURE, { expiresIn: 60 * 60 * 24 * 30 });

            // Usuario registrado 
            return res.status(201).json({
              user: userCreated,
              token
            });

          })
          .catch(error => {
            return res.status(500).json({
              error: error.message
            });
          })

      }

    })
    .catch(error => {
      return res.status(500).json({
        error: error.message
      });
    })

})


module.exports = server;
