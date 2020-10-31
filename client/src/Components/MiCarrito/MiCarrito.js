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

function MiCarrito (data){
    
    const classes = useStyles();
    const orden = useSelector(store => store.carrito.orden); //Accedo al estado del carrito
    const dispatch = useDispatch();

    console.log(data);
    
    useEffect(() => {
        dispatch(getPedido(data.match.params.id))
      //Hago que siempre se actualice la pág. Cuando la pág, encuentra que el cart está en "procesando"
  
    }, [orden]);
    console.log(orden)
    return (
        <div>

 
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
</div>
</div>
            

        </div>
    )
}

export default MiCarrito
