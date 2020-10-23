import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { postReview } from '../../Redux/review';
import { useDispatch } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));


export default function CustomizedRatings({match}) {
  const dispatch = useDispatch();
  var idProd = match.params.idProd;
  var idUser = match.params.idUser

  function posteo(){
    dispatch(postReview(idProd, idUser))
    alert('usuario: '+idUser +' producto: '+idProd)
  }
  const classes = useStyles();
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off" >
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Califique el producto</Typography>
        <Rating
          name="customized-empty"
          defaultValue={5}
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
        <TextField id="outlined-basic" label="Escriba su comentario" variant="outlined" />
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={()=>posteo()}
        >
        Comentar
      </Button>
    </form>
    </div>
  );
}