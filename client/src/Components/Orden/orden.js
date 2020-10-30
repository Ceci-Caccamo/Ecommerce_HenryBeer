import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {getPedido} from '../../Redux/Carrito';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

export default function Orden(data) {

    const classes = useStyles();
    const orden = useSelector(store => store.carrito.orden); //Accedo al estado del carrito
    const dispatch = useDispatch();

    console.log(data);
    
    useEffect(() => {
        dispatch(getPedido(data.match.params.id))
      //Hago que siempre se actualice la pág. Cuando la pág, encuentra que el cart está en "procesando"
  
    }, [orden]);
  
  
console.log(orden)


  const completada = (id) =>{
    const {data} = axios.put(`http://localhost:4000/users/completada/${id}`)
    
  }

  const cancelada = (id) =>{
    const {data} = axios.put(`http://localhost:4000/users/cancelada/${id}`)
  }

  const creada = (id) =>{
    const {data} = axios.put(`http://localhost:4000/users/creada/${id}`)
  }


    return(
<div>
<a href="javascript:history.back(1)" className='btn1' style={{marginTop: "10px"}} >
  <div  >
  <Button variant="contained" color="secondary"  >
   Volver
 </Button>
 </div></a>
 <div>
 </div>
 
 <div className="card" style={{width: "700px", height: "100%", marginLeft: "30%"}}>
<div className="card-body">
<h1 className="card-title">ID de la orden {orden.id}</h1>
<h2 className="card-subtitle mb-2 text-muted">Status de la orden: {orden.status}</h2>
{orden.products && orden.products.map((e)=>(
                 <div>
                   <h5>Name: {e.name}</h5>
                  <h6>Quantity: {e.orden.quantity}</h6>
                  </div>
                 ))}
{orden && orden.status === "procesando" && <Button onClick={()=>creada(orden.id)} variant="contained" color="secondary" style={{marginLeft: "10px", marginRight: "20px", backgroundColor: "green"}} >
   Procesar 
 </Button>}
{orden && orden.status === "creada" && <Button onClick={()=>completada(orden.id)} variant="contained" color="secondary"  style={{marginLeft: "10px", marginRight: "20px", backgroundColor: "green"}} >
   Completar
 </Button>}
 <Button variant="contained" color="secondary" onClick={()=>cancelada(orden.id)} >
   Cancelar
 </Button>
</div>
</div>
</div>
    )
}