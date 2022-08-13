const { request, response } = require('express');

const getUsuarios = (_req, res = response)=>{
	// const {q, nombre} = req.query;
	res.json({
		msg:'Get - Api Controller!!',
        
	});
};

const postUsuario = (req = request, res = response)=>{
	const {nombre, edad, coment} = req.body;
	res.json({
		msg:'POST Api - Controller',
		nombre,
		edad,
		coment
	});
};

const putUsuario = (req = request, res = response)=>{
	const id = parseInt(req.params.id);
	res.json({
		msg:'PUT Api - Controller',
		id
	});
};

const deleteUsuarios = (_req , res = response)=>{
	res.json({
		msg:'DELETE Api - Controller'
	});
};

module.exports = {
	getUsuarios,
	postUsuario,
	putUsuario,
	deleteUsuarios
};