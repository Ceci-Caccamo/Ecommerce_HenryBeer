import React, {useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { getReview  } from '../../Redux/review';



//Muestra todas las review de un producto
const Review = (data) => {
const idProd = data.match.params.idProd;
const reviews = useSelector(store => store.review.reviews);
console.log(reviews);
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getReview(idProd))
}, [dispatch,idProd] )

    return ( <div>
        {reviews.map((review)=>(
        <div key={review.id}> 
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Calificación del Producto</Typography>
        <Rating
          name="simple-controlled"
          value={review.calification }
        />
        <Typography component='h2'>Fecha de creación: {review.createAt } </Typography>
        <Typography component='h2'>Descripción o comentario: {review.commentary} </Typography>
        </Box>       
        </div> ))}
        </div>
    );
}
 
export default Review;


/* export default (idProd)=>{
var idProd = data.match.params.idProd;
var reviews = useSelector(state => state.review.reviews);
console.log(reviews);
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getReview(idProd))
}, [dispatch,idProd] )
    return (
        <div>
        {reviews.map((review)=>(
        <div key={review.id}> 
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Calificación del Producto</Typography>
        <Rating
          name="simple-controlled"
          value={review.calification }
        />
        <Typography component='h2'>Fecha de creación: {review.createAt } </Typography>
        <Typography component='h2'>Descripción o comentario: {review.commentary} </Typography>
        </Box>       
        </div> ))}
        </div>
    )

} */