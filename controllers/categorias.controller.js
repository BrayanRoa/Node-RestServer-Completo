/* eslint-disable no-unused-vars */
const { request, response} = require('express');
const Categorias = require('../models/categorias');


//* PAGINADO, TOTAL, POPULATE
const getCategorias = async (req = request, res =response)=>{

	const {limite=5, desde = 0} = req.query;

	try {
		const [total, categorias] = await Promise.all([
			Categorias.countDocuments({estado:true}),
			Categorias.find({estado:true})
				.populate('usuario', 'nombre')
				.skip(+desde)
				.limit(+limite)
		]);
	
		res.json({
			total,
			categorias
		});
	} catch (error) {
		res.json({
			error
		});
	}
	

};

const getCategoriaPorID = async(req = request, res =response)=>{
	const {id} = req.params;

	try {
		const categoria = await Categorias.findById(id).populate('usuario', 'nombre');
	
		res.json({
			categoria
		});
	} catch (error) {
		res.json({
			error
		});
	}
};

const postCategoria = async(req = request, res =response)=>{

	const nombre = req.body.nombre.toUpperCase();

	try {
		const categoriaDb = await Categorias.findOne({nombre});

		if(categoriaDb){
			return res.json({
				msg:`La categoria ${nombre} ya existe`
			});
		}

		//* GENERAR LA DATA A GUARDAR
		const data = {
			nombre,
			usuario:req.usuario._id
		};

		const categoria = new Categorias(data);

		//*GUARDAR EN BD
		await categoria.save();

		res.status(201).json({
			categoria
		});
	} catch (error) {
		res.json({
			error
		});
	}
	
};

const putCategoria = async(req = request, res =response)=>{
	const {id} = req.params;

	try {
		const {estado, usuario, ...data} = req.body;
		data.nombre = data.nombre.toUpperCase();
		data.usuario = req.usuario._id;

		const categoria = await Categorias.findByIdAndUpdate(id, data, {new:true}).populate('usuario', 'nombre');

		res.json({
			categoria
		});
	} catch (error) {
		res.json({
			error
		});
	}
};

const deleteCategorias = async (req = request, res =response)=>{
	const { id } = req.params;

	try {
		const categoria = await Categorias.findByIdAndUpdate(id, {estado:false}, {new:true});

		res.json({
			categoria
		});
	} catch (error) {
		res.json({
			error
		});
	}
};


module.exports = {
	getCategorias,
	getCategoriaPorID,
	postCategoria,
	putCategoria,
	deleteCategorias
};