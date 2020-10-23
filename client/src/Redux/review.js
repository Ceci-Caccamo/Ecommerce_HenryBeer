import axios from 'axios'

//Estado inicial

const InicialState = {
    reviews: [],
    review:[]
}

//Constantes 

const GET_REVIEW = 'GET_REVIEW'
const POST_REVIEW = 'POST_REVIEW'


//Reducer

 export default function reviewReducer(state = InicialState, action){
  switch(action.type){
    case GET_REVIEW: 
      return {...state, reviews: action.payload }
    case POST_REVIEW:
      return {...state,  }
    default: return state  
  }
 }

//Action

export const getReview = (idProd)=> async(dispatch)=>{

   try {
       const {data} = await axios.get('http://localhost:4000/review/product/'+idProd)//busca el producto
       dispatch({
           type: GET_REVIEW,
           payload: data
       })
   } catch (error) {
       console.log(error)
   }
}

export const postReview = (idProd, idUser)=> async(dispatch)=>{

    try {
        const {data} = await axios.post('http://localhost:4000/review/product/'+ idProd+'/user/'+ idUser)
        dispatch({
            type: POST_REVIEW,
        })
    } catch (error) {
        console.log(error)
    }
}