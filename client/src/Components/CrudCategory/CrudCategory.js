import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './CrudCategory.css'
import {useSelector, useDispatch} from 'react-redux'
import {getCategory} from '../../Redux/category'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    borderRadius: '10px',
    color: 'white',
    backgroundColor: 'rgb(70 70 70)',
  }
});


const CrudCategory =()=>{

    const dispatch = useDispatch()
    const categoria = useSelector(store => store.category.categories)


    useEffect(()=>{
      dispatch(getCategory())
    },[])

    const[category, setCategory] = useState({
        id: "",
        name: "",
        description: ""
    });
    const classes = useStyles();
    const {name, description} = category
    
    const handleSubmit = e => {
        e.preventDefault()
    }

    const handleChange = e =>{
        setCategory({
            ...category,
            [e.target.name] : e.target.value
        })
    }

    const handleSearch = async(category) => {
         setCategory(category)

    }
    
    
    const addCategory = async() =>{
        const info = {
            name: category.name,
            description: category.description
        }
           const {data} = await axios.post('http://localhost:4000/category/create', info)
           console.log(data)
           alert('Categoria creada!')
           setCategory({
            id: "",
            name: "",
            description: ""
           })
       }

    const updateCategory = async() =>{
        const info = {
            name: category.name,
            description: category.description
        }
           const {data} = await axios.put(`http://localhost:4000/category/update/${category.id}`, info)
           console.log(data)
           alert('Categoria Modificada!')
           setCategory({
            id: "",
            name: "",
            description: ""
           })
       }
       

    const deleteCategory = async()=>{
     
        const {data} = await axios.delete(`http://localhost:4000/category/${category.id}`)
        alert('Categoria borrada!')
        setCategory({
          id: "",
          name: "",
          description: ""
         })
    }   

    return(
      <div style={{backgroundColor: "rgb(108 117 125)", height: '2000px', marginTop: "-110px"}} >
        <div  style={{display: "flex", color: "white", paddingTop: "120px"}} >
          <div className='formCrudCategory' style={{marginLeft: "350px", marginTop: "-100px"}} >
         <form onSubmit={(e) => handleSubmit(e) } style={{marginBottom: "10px", marginTop: "10px"}} >
             <h6>Name</h6>
          <input type='text'   value={name} onChange={handleChange}  name='name'  /> 
             <h6>Description</h6>
          <input type='text'   value={description}  onChange={handleChange}  name='description'/><br/><br/>
          <button type='submit' className='create' onClick={()=> addCategory()}  >Crear </button>   
          <button type='submit' className='update' onClick={()=> updateCategory()}  >Actualizar </button>
          <button type='submit' className='delete' onClick={()=> deleteCategory()}  >Borrar </button>   
        </form>   
        </div>
        <div>
        <div className = "divcategories"  style={{width: "200px", marginTop: "-100px"}} >

            <div className={classes.root}>
            <h3 style={{marginLeft: "10px"}} >Categorías</h3>
              <List component="nav" aria-label="secondary mailbox folders" style={{height: "300px", overflow: "scroll"}} >
                {categoria && categoria.map(c => <ListItem button onClick={() => handleSearch(c)} value={c.id} >
                  <ListItemText primary={c.name}/>
                </ListItem>)}
              </List>
            </div>
          </div>
        </div>
        </div>
        </div>
    )
     

}

export default CrudCategory