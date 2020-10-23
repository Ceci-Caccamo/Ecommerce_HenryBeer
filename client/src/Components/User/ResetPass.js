import React, { useState } from "react";
import axios from 'axios'

export default function ResetPass() {

  const [resetPassword, setResetPassword] = useState('');
  const [error, setError] = useState("");
  const [usuario, guardarUsuario] = useState({
    email: null,
    password: null,
    nueva: null,
  });
  
  
  // extraer de usuario
  const { email, password, nueva } = usuario;
  
  const handleInput = (e) => {
    if (error) setError("");
    if (resetPassword) setResetPassword('');
    guardarUsuario({ ...usuario, [e.target.name]: e.target.value });
    console.log(nueva);
  };

  const handleSend = e => {
		e.preventDefault();

		if (!email || !password || !nueva)
			return setError('Debes completar todos los campos');
		if (password !== nueva) return setError('Las contraseñas no coinciden');

		axios
			.patch('http://localhost:4000/auth/reset', {...usuario})
			.then(() => setResetPassword('La contraseña se actualizó con éxito'))
			.catch(() => setError('No se pudo actualizar la contraseña'));
	};

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Cambiar Contraseña</h1>

        <form onSubmit={handleSend}>
        <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={usuario.email}
              onChange={handleInput}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={usuario.password}
              onChange={handleInput}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Nueva contraseña</label>
            <input
              type="password"
              id="nueva"
              name="nueva"
              placeholder="Repite tu Password"
              value={usuario.nueva}
              onChange={handleInput}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className=" btn btn-primario btn-block" /* onClick={(e) => handleCreate(e)} */
            />
          </div>
        </form>
      </div>
    </div>
  );
}
