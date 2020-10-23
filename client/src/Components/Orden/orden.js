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
            <div>
                <h1> {orden.id} </h1>
                <h2> {orden.status} </h2>
                {orden.products && orden.products.map((e)=>(
                  <div>
                  <h3>Name: {e.name}</h3>
                 <h3>Quantity: {e.orden.quantity}</h3>
                 </div>
                ))}
            </div>
        </div>
    )
}