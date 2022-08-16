const { validationResult } = require('express-validator');

const validarCampos = (req, res, next)=>{
	//* VALIDO SI HAY ERRORES A LA HORA DE RECIBIR LOS DATOS
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json(errors);
	}
	next();
};

module.exports = {
	validarCampos
};