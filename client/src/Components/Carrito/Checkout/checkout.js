import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import {allActions} from '../../../Redux/Actions/actions.js';
import axios from 'axios';
import './Checkout.css';




export default function FormularioDatosEnvio() {

	const currentCart = useSelector(state => state.carrito.carrito);
	const userId = useSelector(state => state.user.id);
	const email_usuario = useSelector(state => state.user.email);
	const dispatch = useDispatch();

	
	const [inputValues, setInputValues] = useState({
		Pais:'',
		Ciudad: '',
		direccion_envio: '',
		codigo_postal: 0,
		numero_telefono: 0,
		tipo_envio:''
	});
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setInputValues({
				Pais:'',
				Ciudad: '',
				direccion_envio: '',
				codigo_postal: '',
				numero_telefono: '',
				tipo_envio:''
			});
		},
		[ currentCart.id ]
	);

	const handleInputChange = event => {
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	return (
		<div className="productFormAdmin overAll">
			<div className="productTableTitleContainer">
				<div className="productTableTitle">
					<form className="FormEnvio">
						<h3>Formulario de Envio</h3>

						<div className="lineaformularioenvio">
							<span htmlFor="Nombre" className="">
								Nombre:
							</span>
							<input
								className="product"
								type="text"
								name="nombre_usuario"
								value={inputValues.nombre_usuario}
								placeholder="Nombre"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Apellido" className="">
								Apellido:
							</span>
							<input
								className="product"
								type="text"
								name="apellido_usuario"
								value={inputValues.apellido_usuario}
								placeholder = "Apellido"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Pais" className="">
								Pais:
							</span>
							<input
								className="product"
								type="text"
								name="Pais"
								value={inputValues.Pais}
								placeholder="Pais"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Ciudad" className="">
								Ciudad:
							</span>
							<input
								className="product"
								type="text"
								name="Ciudadad"
								value={inputValues.Ciudadad}
								placeholder="Ciudad"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Direccion" className="">
								Dirección:
							</span>
							<input
								className="product"
								type="text"
								name="eireccion_envioon_envio"
								value={inputValues.direccion_envio}
								placeholder="Dirección"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="CodigoPostal" className="">
								Código Postal:
							</span>
							<input
								className="product"
								type="text"
								name="codigo_postal"
								value={inputValues.codigo_postal}
								placeholder="Código Postal"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Telefono" className="">
								Telefono:
							</span>
							<input
								className="product"
								type="text"
								name="numero_telefono"
								value={inputValues.numero_telefono}
								placeholder="Telefono"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="TipodeEnvio" className="">
								Tipo de Envio:
							</span>
							<input
								className="product"
								type="text"
                                name="tipo_envio"
                                placeholder="Tipo de Envio"
                                value={inputValues.tipo_envio}
                                onChange={handleInputChange}
							/>
						</div>

						<div className="formActionContainer">
                            <button
                             type="submit"
                              className="SendBtn"
                               value="Edit"
                                /*onClick={handleSend}*/>
								Aceptar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
