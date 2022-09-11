/* eslint-disable no-unused-vars */
const { request, response } = require('express');


const cargarArchivos = async (req=request, res=response)=>{
    
	res.json({
		msg:'uploads'
	});
};

module.exports = {
	cargarArchivos
};