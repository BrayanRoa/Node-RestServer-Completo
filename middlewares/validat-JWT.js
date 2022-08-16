/* eslint-disable no-unused-vars */
// const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const   jwt  = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req= request, res=response, next)=>{
	const token = req.header('x-token');
	if(!token){
		res.status(401).json({
			msg:'No hay token en la petición'
		});
	}

	try {
		const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
		const usuario = await Usuario.findById({_id:uid});

		if(!usuario){
			return res.status(500).json({
				msg:'Token no valido - Usuario no registrado en BD'
			});
		}

		//* verificar si el usuario que desea hacer la accion aun sigue activo
		if(!usuario.estado){
			return res.status(401).json({
				msg:'Token no valido - usuario inactivo para realizar esta acción'
			});
		}

		//* creo unas nuevas propiedades en el request
		req.usuario = usuario;
		req.uid = uid;
		next();
	} catch (error) {
		res.status(401).json({
			msg:'Token no valido',
			error
		});
	}
};

module.exports = validarJWT;