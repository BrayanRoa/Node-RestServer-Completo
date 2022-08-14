const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt  = require('bcryptjs');

const getUsuarios = async (req, res = response)=>{
	const { limite=5, desde=0 } = req.query;
	
	//* el caracter + me convierte el valor de la variable a número
	if(isNaN(+limite) || isNaN(+desde)){
		return res.status(400).json({msg:'error'});
	}

	// const usuarios = await Usuario.find({estado:true})
	// 	.skip(+desde)
	// 	.limit(+limite);

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments({estado:true}),
		Usuario.find({estado:true})
			.skip(+desde)
			.limit(+limite)
	]);

	res.json({
		total,
		usuarios
	});
};

const postUsuario = async (req = request, res = response)=>{

	const {nombre, correo, password, rol} = req.body;

	const usuario = new Usuario({nombre,correo, password, rol});
	
	//* ENCRIPTAR CONTRASEÑA
	const sal = bcrypt.genSaltSync();
	usuario.password = bcrypt.hashSync(password, sal);

	//* GUARDAR EN BD
	await usuario.save();
	
	res.json(usuario);
};

const putUsuario = async (req = request, res = response)=>{

	const id = req.params.id;
	// eslint-disable-next-line no-unused-vars
	const {_id, password, google, correo, ...resto} = req.body;

	//TODO: validar ID contra base de datos
	if(password){
		//* ENCRIPTAR CONTRASEÑAa
		const sal = bcrypt.genSaltSync();
		resto.password = bcrypt.hashSync(password, sal);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);
	res.json(usuario);
};

const deleteUsuarios = async (req , res = response)=>{
	const {id} = req.params;

	//* ELIMINAR FISICAMENTE
	// const usuario = await Usuario.findByIdAndDelete(id);

	const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

	res.json({
		usuario
	});
};

module.exports = {
	getUsuarios,
	postUsuario,
	putUsuario,
	deleteUsuarios
};