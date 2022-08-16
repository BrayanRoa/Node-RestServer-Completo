const { request, response } = require('express');

const esAdminRol = (req = request, res = response, next)=>{

	if(!req.usuario){
		return res.status(500).json({
			mag:'Se quiere verificar el rol sin validar el rol'
		});
	}

	const { rol, nombre} = req.usuario;

	if(rol !== 'ADMIN_ROLE'){
		return res.status(401).json({
			msg:`${nombre} no autorizado/a para realizar esta acción`
		});
	}
	
	next();
};

module.exports = { esAdminRol };