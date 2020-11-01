import React, { useState, useEffect } from "react";
// import "./index.css";
import Header from "./Compo2/Header";
import Footer from "./Compo2/Footer.jsx";
import Product from './Components/Product/Product'
import Catalogo from './Components/Catalogo/Catalogo.js'
import axios from 'axios'
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getbeers } from './Redux/beer'
import { getCategory } from './Redux/category'
import Admin from './Components/Admin/Admin';
import Dashboard from './Components/Admin/Dashboard';
import Login from './Components/User/Login'
import NuevaCuenta from './Components/User/NuevaCuenta'
import Carrito from './Components/Carrito/Carrito'
import Orden from './Components/Orden/orden'
import { getOrdenes } from "./Redux/Carrito";
import ResetPass from './Components/User/ResetPass'
import { positions, Provider as ProviderAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {validation} from './Redux/user'
import UserActivity from './Components/userActivity/userActivity'
import Home from './Compo2/Home'
import NavBar from './Components/NavBar/NavBar'




const options = {
  timeout: 5000,
  position: positions.MIDDLE
};

function App() {
  const [search, setSearchApp] = useState({
    array: [],
    word: "",
  });

  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user)
  const category = useSelector(store => store.category.categories)
  const products = useSelector(store => store.beer.beers)
  const ordenes = useSelector(store => store.carrito.ordenes);

  useEffect(() => { // Similar al componentDidMount
    dispatch(validation())
    dispatch(getbeers())
    dispatch(getCategory())
    dispatch(getOrdenes())
  }, []) 

  return (
    <div >
 <ProviderAlert template={AlertTemplate} {...options}>
      <BrowserRouter>
      <Route exact path="/"
          component={Home}
        />

        <Route exact path="/"
          component={Header}
        />
        <Route exact path="/"
          component={Footer}
        />
        <Route exact path="/login"
          component={Login}
        />

        
        <Route exact path="/nuevacuenta"
          component={NuevaCuenta}
        />

        <Route exact path="/resetPass"
          component={ResetPass}
        />

        <Route
          exact path="/products/search"
          render={() => <Catalogo products={search.array} search={search.word} />}
        />

        <Route exact path="/catalogo/:id"

          render={({ match })=>
          <div className='product'>
          <Product user={user.id} product={products.filter(p => p.id === Number(match.params.id))}/>
        </div>}
        />
        {/* product={products.filter(p => p.id === Number(match.params.id))} */}

        <Route
          exact path="/products/catalogo/:id"
          render={({ match }) => <Catalogo products={products.filter(p => p.categories.id === match.params.id)} category={match.params.id} />}
        />

        <Route exact path='/catalogo'
          component={Catalogo}
        />

        
        <Route exact path='/catalogo'
          component={Home}
        />

        <Route
         exact path='/carrito'
         component={Carrito}
        />

        <Route
         exact path='/carrito'
         component={Home}
        />
        
        <Route
         exact path='/userActivity'
         component={Home}
        />
        
        <Route
         exact path='/userActivity'
         component={UserActivity}
        />


        <Route
          path='/admin'
          component={Dashboard}
        />
         {/* <Route
          path='/prueba'
          component={Dashboard}
        /> */}

      </BrowserRouter>
      </ProviderAlert>
    </div>
  );
}
export default App;