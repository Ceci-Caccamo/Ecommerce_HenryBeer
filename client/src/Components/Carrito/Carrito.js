import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {getcarrito} from '../../Redux/Carrito'
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './Carrito.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const Carrito = () => {

    const classes = useStyles();
    const carrito = useSelector(store => store.carrito.carrito) //Accedo al estado del carrito
    const dispatch = useDispatch()

    useEffect(()=>{  //Hago que siempre se actualice la pág. Cuando la pág, encuentra que el cart está en "procesando"

        dispatch(getcarrito(1))

        const fetchData =async()=>{
          await axios.post(`http://localhost:4000/users/1/carrito`)    
        }
        fetchData()
    },[carrito])

    console.log(carrito)

    const DestroyCart = async()=>{ //Vacía el carrito
     const {data} = await axios.delete(`http://localhost:4000/users/1/deletecart/${carrito.id}`)
     alert('Carrito eliminado correctamente')
    }

    const handleBuy = async() =>{ // Manejador de la compra: cambia el status de "creado" a "procesando"
    const {data} = await axios.put(`http://localhost:4000/users/procesando/${carrito.id}`) 
    alert('Compra exitosa')
    }

    const DeleteProduct = async(id)=>{ //  Elimina el producto
     const {data} = await axios.delete(`http://localhost:4000/users/product/${id}/delete/${carrito.id}`)
    }

    const Increment = async(id, stock)=>{ //Realiza el put, y aumenta la cantidad del mismo producto
       if(stock<=1){
         alert ('No hay stock suficiente')
       }else if (stock > 0){
        const {data} = await axios.put(`http://localhost:4000/users/product/${id}/increment/${carrito.id}`)
        await axios.put(`http://localhost:4000/products/decrement/${id}`)
       }
    }

    const Decrement = async(id,quantity)=>{ // Usa misma ruta que el delete prod en el caso de que la cantidad llegue a cero
      if(quantity <=-1){                   //Mientras tanto, va decrementando normalmente
        const {data} = await axios.delete(`http://localhost:4000/users/product/${id}/delete/${carrito.id}`)
      }else if(quantity > 0){
        const {data} = await axios.put(`http://localhost:4000/users/product/${id}/decrement/${carrito.id}`)
        await axios.put(`http://localhost:4000/products/increment/${id}`)
      }
   }


    return( 
        <div>
       { carrito.products && carrito.products[0] && <div><table class="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Quantity</th>
      <th scope="col"></th>
      <th scope="col">Total</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
      {carrito.products && carrito.products.map((e)=>(
        <tr>
         <td>{e.name}</td>
         <td>{e.price}</td>
         <td>{e.stock}</td>
         <td >{e.orden.quantity}</td>
         <td  ><Button variant="contained" onClick={()=>Increment(e.id, e.stock)} >+</Button><span>    </span><Button variant="contained" onClick={()=> Decrement(e.id,e.orden.quantity)} >-</Button></td>
      <td ><label for={e.name}>${e.price * e.orden.quantity }</label></td>
         <td scope="col"> <Button variant="contained" color="secondary" onClick={()=> DeleteProduct(e.id)} >Borrar</Button></td>
        </tr>
      ))}
  </tbody>
</table>
<Button variant="contained" style={{backgroundColor: "green", color: "white", marginLeft: "10px"}} onClick={()=> handleBuy()} >Comprar</Button> 
<Button variant="contained" style={{backgroundColor: "red", color: "white", marginLeft: "30px"}} onClick={()=> DestroyCart()} >Borrar carrito</Button></div>}
{carrito.products && !carrito.products[0] && <div className='titnocarrito' style={{marginLeft: "340px"}}>
                    <div className='divcarritovacio'>
                    <h2>¡Tu carrito está vacío!</h2>
                    </div>
                </div>}
        </div>
    )
}

export default Carrito