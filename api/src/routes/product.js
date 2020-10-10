const server = require('express').Router();
const { Product } = require('../db.js');
const { Sequelize:{Op}} = require('sequelize');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/create', (req,res)=>{

	const {name, description, price, stock, image, category} = req.body
	if(!category){
		Product.findOrCreate({where:{
			name, description, price, stock, image
		},defaults: {category:[]} })
	.then(product =>{
			res.status(200).json('Agregado correctamente')
		  })
	.catch(err=>{
			  console.log()
			 res.status(400).json(err)
	})
	}else{
		Product.findOrCreate({where:{
			name, description, price, stock, image,category
		}})
	.then(product =>{
			res.status(200).json('Agregado correctamente')
		  })
	.catch(err=>{
			  console.log()
			  res.status(400).json(err)
	})
	} 
	
	
})

server.put('/:id', (req,res)=>{// Es un put a /products/update/:id
  const id = req.params.id	
  const {name, description, price, stock, image, category} = req.body
  Product.update({
   name, description, price, stock, image, category
},{where: {id}})
.then((product)=>{
	res.status(200).send('Modificado correctamente')
	console.log(product)
 })
.catch((err)=>{
	res.status(400).json(err)
	console.log(err)
 }) 
})


server.get('/:id', (req, res)=>{
   const id = req.params.id

   Product.findOne({where: {id}})
   .then(product => {
	   res.status(201).json(product)
   })
   .catch(err =>{
	   console.log(err)
	   res.status(404).json(err)
   })
})


server.get('/find/search',(req,res) => {
	Product.findAll({
		where: {
			[Op.or]: {
			  name: {
				[Op.like]: `%${req.query.name}%`,
			  },
			  description: {
				[Op.substring]: `${req.query.name}`,
			  }
			}
		  }
	}).then(products => {
		res.status(200).json(products)}
	).catch(error =>{ 
		res.status(404).json(error)
	})
})
//CREAR RUTA PARA ELIMINAR PRODUCTO
server.delete("/:id", (req, res) => { //modifiqué /:id, el products está en el index 
    const id = req.params.id;
	Product.destroy({
		where: { id: id }
	}).then((id) => {
		res.status(200).send("Producto" + id + "eliminado")//  Agregué status//REVISAR CONSOLOGUEO, NO ACTUALIZA ID
	}).catch(function (err) {
		console.log("delete failed with error: " + err);
		// handle error;
	});
    
});


module.exports = server;




// {
//     "name": "hola",
//     "description": "holaaa",
//     "price": 999,
//     "stock": 324,
//     "image": "sadas",
//     "category": [1,2,3,5]
// }