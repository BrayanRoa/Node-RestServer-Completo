/* eslint-disable no-unused-vars */
const {request, response} = require('express');
const Usuario = require('../models/usuario');
const bcryp = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req = request, res = response)=>{
    
	const {correo, password} = req.body;

	try {

		//* verificar si el email existe
		const usuario = await Usuario.findOne({correo});
		if(!usuario){
			return res.status(400).json({
				msg:'Correo no esta registrado'
			});
		} 

		//* verificar si el usuario esta activo
		if(!usuario.estado){
			return res.status(400).json({
				msg:'Usuario inactivo - estado:False'
			});
		}

		//* verificar contraseña
		const validPassword = bcryp.compareSync(password, usuario.password);

		if(!validPassword){
			return res.status(400).json({
				msg:'Contraseña incorrecta'
			}); 
		}

		//* generar el JWT
		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token
		});

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg:'Hable con el administrador',
			error
		});
	}

	
};

module.exports = {
	login
};