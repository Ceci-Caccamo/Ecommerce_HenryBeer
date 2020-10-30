import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authGoogle, loginUser , cleanMessage} from "../../Redux/user.js";
import { useDispatch, useSelector } from "react-redux"; 
import ResetPass from './ResetPass'
import { useAlert } from "react-alert";
import { useHistory } from 'react-router';
import GoogleLogin from 'react-google-login';
import { loadAuth2 } from "gapi-script";

//falta la auth que compare las pass para loguear.

const Login = ({history}) => {
  const historia = useHistory()
  const usuario = useSelector(store => store.user.user)
  const error = useSelector(store => store.user.error)
  const dispatch = useDispatch();
  const [err, setError] = useState(false)



  const alert = useAlert();

  // State para iniciar sesión
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // extraer de usuario
  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError(false)
    dispatch(cleanMessage())
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(!email || !password)
    return setError(true)
  };

  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        dispatch(authGoogle(googleUser));
    
      }, (error) => {
        console.log(JSON.stringify(error))
      });
  }
  


  useEffect(() => {
    const getApiGoogle = async () => {
      const CLIENT_GOOGLE = '880118948373-ael4igsvhmjssb6qflr341rdgt45ct2f.apps.googleusercontent.com'
      let auth2 = await loadAuth2(CLIENT_GOOGLE, '');
      attachSignin(document.querySelector('#btn-google'), auth2);
    }

    getApiGoogle();
  }, [])

  useEffect(() => {

    if(usuario.token){
      history.push('/')
    }

    if (usuario.id) {
      history.push('/')
      historia.go(0)
      
    }
  }, [usuario])


  const handleLogin = () => {
      dispatch(loginUser(user))
  }

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
           
        <form onSubmit={onSubmit}> 
        <div>
        <button onClick={(e) => e.preventDefault()} id='btn-google' style={{border: "0", backgroundColor: "gray", borderRadius: "100%", marginLeft: "180px"}} > <i className="fab fa-google-plus-g"></i> <img style={{width: "30px", height: "45px"}} src='https://www.flaticon.es/svg/static/icons/svg/60/60786.svg' /></button>
          {/* <GoogleLogin className= "botonGoogle" 
             buttonText= "Ingresá con tu cuenta de Google"
           /> */}  
       <br/><br/>
           </div>
          <div className="campo-form">
            <label htmlFor="email"> Email </label> 
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <input
            type="submit"
            className="btn btn-primario btn-block"
            onClick={(e)=>handleLogin(e)}
          />
        </form>
        {
             error && <div className='mx-auto text-center'><span className='text-center text-danger mb-1'>{error}</span></div>
              }
        {err && <div className='mx-auto text-center'><span className='text-center text-danger mb-1'>Los campos son obligatorios</span></div>}
          <Link to={"/NuevaCuenta"} className="enlace-cuenta">No tenes cuenta? Registrate</Link>
          <Link to={"/forgot"} className="enlace-cuenta">Olvidaste tu contraseña?</Link>
      </div>
     
    </div>
  );
};

export default Login;