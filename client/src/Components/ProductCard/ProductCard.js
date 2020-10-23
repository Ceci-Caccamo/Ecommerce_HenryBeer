import axios from 'axios'
import React, {useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import Product from '../Product/Product'
import './ProductCard.css'
import {getcarrito} from '../../Redux/Carrito'
import {useSelector, useDispatch} from 'react-redux'
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
});



export default function MediaCard({name, image, stock, description, categories, price, id}) {
  
  const carrito = useSelector(store => store.carrito.carrito)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getcarrito(1))
    
  },[])
  
  console.log(carrito)
  const [buttonClicked, setButtonClicked] = useState(false);


  const handleCart = async()=>{ // Agrega un determinado producto a un carrito en particular
     const {data} = await axios.post(`http://localhost:4000/users/${id}/orden/${carrito.id}`)
    alert('Producto agregado')
   }


  const handleButtonClick = () => {
      setButtonClicked(true)
  }

  const classes = useStyles();

  return (
    <Fragment>
    {stock > 0 && <div className="containerClass"  >
    <Card className={classes.root} style={{width: "340px"}} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Cerveza Artesanal"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography  color="textSecondary" component="h1">
           ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
     <Link to={`/catalogo/${id}`} > <Button size="small" color="primary"  onClick={() => handleButtonClick()} >
          Más información
        </Button> </Link>
     <Button size="small" color="primary" style={{marginLeft: "100px"}} onClick={() => handleCart()} >
     <AddShoppingCartIcon />
      </Button>  
        {buttonClicked ? <Product datas={name, description, price, stock}/> : null} 
      </CardActions>
    </Card>
    </div>}
    { stock <= 0 && <div className="containerClass"  >
    <Card className={classes.root} style={{width: "340px", backgroundColor: "#cebcb5"}}  >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Cerveza Artesanal"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography  color="textSecondary" component="h1">
           ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <label style={{position: "absolute", fontSize: "30px", paddingTop: "20px", paddingLeft: "100px"}} >Sin stock</label>
     {/* <Link to={`/catalogo/${id}`} > <Button size="small" color="primary"  onClick={() => handleButtonClick()} >
          More information 
        </Button> </Link>
     <Button size="small" color="primary" style={{marginLeft: "100px"}} onClick={() => handleCart()} >
     <AddShoppingCartIcon />
      </Button>  
        {buttonClicked ? <Product datas={name, description, price, stock}/> : null}  */}
      </CardActions>
    </Card>
    </div>}
    </Fragment>
  );
}
