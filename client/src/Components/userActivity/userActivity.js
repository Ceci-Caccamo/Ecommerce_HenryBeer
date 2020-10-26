import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { BrowserRouter} from 'react-router-dom'
import  {useDispatch, useSelector} from "react-redux"; 
import {logoutUser} from '../../Redux/user'




const UserActivity = ({}) => {
    
    
    const usuario = useSelector(store => store.user.user)
    const dispatch = useDispatch()

    return (
        <BrowserRouter>
        <h1>Panel de Usuario</h1>
            <div style={{ width: "20%", height: "130px", backgroundColor: "gray", color: "white", borderRadius: "10px", marginTop: "5px", marginLeft: "10px" }} >
                <div style={{ padding: "15px 15px 15px 15px", color:"white" }} >
                    <div>
                        <Link> <h6 style={{color:"white", textAlign:"center" }}>Datos Personales</h6> </Link>
                    </div>
                    <div>
                        <Link> <h6 style={{color:"white", textAlign:"center" }}>Mis carritos</h6> </Link>
                    </div>
                    <div>
                        <Link> <h6 style={{color:"white", textAlign:"center" }}>Mis compras</h6> </Link>
                    </div>
                    <div>
                        <Link to= "/" onClick={()=>dispatch(logoutUser())}>  
                        <h6 style={{color:"white", textAlign:"center" }}>Cerrar Sesión</h6> 
                        </Link>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </BrowserRouter>
    )
}

export default UserActivity