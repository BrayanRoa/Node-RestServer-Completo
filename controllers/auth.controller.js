/* eslint-disable no-unused-vars */
const {request, response} = require('express');
const Usuario = require('../models/usuario');
const bcryp = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const googleVerify = require('../helpers/google-verify');

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

const googleSignIn = async(req=request, res=response)=>{

	const {id_token} = req.body;

	try {
		const {nombre, correo, img} = await googleVerify(id_token);

		let usuario = await Usuario.findOne({correo});
		console.log('miremos el usuario', usuario);

		if(usuario === null){
			const data={
				nombre,
				img,
				correo,
				password:':P',
				google:true,
				rol:'ADMIN_ROLE'
			};

			console.log(data);
			usuario = new Usuario(data);
			await usuario.save();
		}

		//* si usuario esta borrado en BD
		if(!usuario.estado){
			return res.status(401).json({
				msg:'Hable con el admin - usuario borrado'
			});
		}

		//* generar el JWT
		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token
		});
	} catch (error) {
		res.status(400).json({
			ok:false,
			msg:'El token no se pudo verificar'
		});
	}

	
};

module.exports = {
	login,
	googleSignIn
};