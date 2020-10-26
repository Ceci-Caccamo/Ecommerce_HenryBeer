
import React from 'react'
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom"
import axios from 'axios'
import {getUsers} from '../../Redux/user.js'
import Button from "@material-ui/core/Button";
import User from '../User/Login.js'


export default function NewAdmin () {  ///CTRL+K+C COMENTAR Y CTRL+K+U DESCOMENTAR
  
  const dispatch = useDispatch()
  const usersList = useSelector(store => store.user.users)

  useEffect(()=>{
    dispatch(getUsers())
  },[usersList])
  



 const handleUpdate = async(id) =>{

        const {data} = await axios.put(`http://localhost:4000/auth/promote/${id}`)
        console.log(data)
        alert('Nuevo admin')

   }
    
   const handleChange = async(id) =>{

    const {data} = await axios.put(`http://localhost:4000/auth/change/${id}`)
    console.log(data)
    alert('No es admin')

}
    
     

    return (
      <div>
        {usersList && usersList[0] && (
          <div>
              <h5>USUARIOS</h5>
            <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">ROL</th>
                </tr>
              </thead>
              <tbody>
                {usersList &&
                  usersList.map((e) => (
                    <tr>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td scope="col">
                      <td>
                      {e.isAdmin ? <Link to="/admin"></Link> : <Link to = "/"></Link> }
                        <Button variant="contained" color="primary" onClick={()=> handleUpdate(e.id) } >
                         ASIGNAR ADMIN
                          
                        </Button>
{/* 
                        <span>    </span>
                        <Button variant="contained" color="primary" onClick={()=> handleChange(e.id) } >
                          QUITAR ADMIN
                      
                        </Button> */}

                      </td>
                      
                      </td>
                    </tr>
                  ))}

              </tbody>
            </table>
            <div class="table-responsive">
            <h5>ADMINISTRADORES</h5>
            <table class="table table-striped table-dark">
    <thead>
        <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>EMAIL</th>
            <th>ROL</th>
        </tr>
    </thead>
    <tbody>
    {usersList &&
                  usersList.map((e) => (
                    <tr>
                      <td>{e.id}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td scope="col">
                      <td>
                      {usersList && e.isAdmin === true ? e.isAdmin : null }
                      <Button variant="contained" color="primary" onClick={()=> handleChange(e.id) } >
                          QUITAR ADMIN
                      
                        </Button>
                    </td>
                    </td>
        </tr>
       
    ))}
    </tbody>
</table>
</div>

          </div>
        )}
      </div>
    )
};