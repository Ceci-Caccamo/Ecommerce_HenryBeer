require("dotenv").config();
const server = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {verifyToken} = require('../middleware/authentication')
const { SIGNATURE } = process.env;

// Modelo user
const { User } = require("../db");

 

server.get('/me', verifyToken, (request, response) => {

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
      return { mesagge: "No user found with that email address." };
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
module.exports = server;
