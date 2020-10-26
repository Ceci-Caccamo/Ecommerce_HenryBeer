import React, { useEffect, useState } from "react";
import axios from "axios";
import { getcarrito, getOrdenes } from "../../Redux/Carrito";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import Orden from '../Orden/orden'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Ordenes = () => {
  const [buttonclick, setButtonclick] = useState(false)
  const classes = useStyles();
  const ordenes = useSelector((store) => store.carrito.ordenes); //Accedo al estado del carrito
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getOrdenes())
    //Hago que siempre se actualice la pág. Cuando la pág, encuentra que el cart está en "procesando"

  }, [ordenes]);

  console.log(ordenes);

   const handleButton = ()=>{
    setButtonclick(false)
   } 
  return (
    <div>
      {ordenes && ordenes[0] && (
        <div>
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Fecha de creacion</th>
                <th scope="col">ID de orden</th>
                <th scope="col">ID de user</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {ordenes &&
                ordenes.map((e) => (
                  <tr>
                    <td>{e.createdAt.slice(0,10)}</td>
                    <td>{e.id}</td>
                    <td>{e.userId}</td>
                    <td>{e.status}</td>
                    <td scope="col">
                       <Link to ={`/orden/${e.id}`} > 
                        <Button variant="contained" color="secondary" onClick={()=> handleButton() } >
                          Ver orden
                        </Button>
                      </Link>
                      {buttonclick ? <Orden datas={e.id, e.product}/> : null} 
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {ordenes && !ordenes[0]&&<div className="divcarritovacio">
            <h2>¡No hay órdenes para visualizar!</h2>
          </div>}
        </div>
      )}
    </div>
  );
};

export default Ordenes;
