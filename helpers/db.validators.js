const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async(rol='') =>{
	const existeRole = await Role.findOne({rol});
	if ( !existeRole){
		throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
	}
};

const emailExiste = async(correo='')=>{
//* VERIFICAR SI EL CORREO EXISTE
	const existeEmail = await Usuario.findOne({correo});
	if(existeEmail){
		throw new Error(`El correo ${correo}, ya esta registrado`);
	}
};

const existeUsuarioPorId = async(id)=>{
	//* VERIFICAR SI EL ID EXISTE
	const existeId = await Usuario.findById(id);
	console.log(existeId);
	if(!existeId){
		throw new Error(`No existe un usuario con el id ${id}`);
	}
};

module.exports = {
	esRolValido,
	emailExiste,
	existeUsuarioPorId
};