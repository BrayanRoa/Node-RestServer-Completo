/* eslint-disable no-unused-vars */
const { isValidObjectId } = require('mongoose');
const { request, response } = require('express');

const Usuario = require('../models/usuario');
const Categoria = require('../models/categorias');
const Producto = require('../models/producto');

const colecciones = ['usuarios', 'categoria', 'productos'];



const buscar = (req = request, res = response) => {

	const { coleccion, termino } = req.params;

	if (!colecciones.includes(coleccion)) {
		res.status(400).json({
			msg: `Las colecciones permitidas son: ${colecciones}`
		});
	}

	switch (coleccion) {
	case 'usuarios':
		buscarUsuario(termino, res);
		break;

	case 'categoria':
		buscarCategoria(termino, res);
		break;

	case 'productos':
		buscarProductos(termino, res);
		break;

	default:
		res.status(500).json({
			msg: 'Se me olvido hacer esta busqueda'
		});
		break;
	}

};


const buscarUsuario = async (termino = '', res = response) => {

	const esMongoiD = isValidObjectId(termino);

	try {
		if (esMongoiD) {
			//* SI LA BUSQUEDA ES POR ID DE MONGO
			const usuario = await Usuario.findById(termino);
			return res.status.json({
				results: (usuario) ? [usuario] : []
			});
		}

		//* SI LA BUSQUEDA ES POR NOMBRE DEL USUARIO
		const regex = new RegExp(termino, 'i');

		const condicion = {
			$or: [{ nombre: regex }, { correo: regex }],
			$and: [{ estado: true }]
		};

		const [total, usuarios] = await Promise.all([
			Usuario.countDocuments(condicion),
			Usuario.find(condicion)
		]);

		res.status(200).json({
			total,
			usuarios
		});

	} catch (error) {
		res.status(400).json({
			error
		});
	}
};


const buscarCategoria = async (termino = '', res = response) => {

	const esMongoiD = isValidObjectId(termino);
	console.log(esMongoiD);
	try {
		if (esMongoiD) {
			//* SI LA BUSQUEDA ES POR ID DE MONGO
			const categoria = await Categoria.findById(termino);
			return res.json({
				results: (categoria) ? [categoria] : []
			});
		}

		//* SI LA BUSQUEDA ES POR NOMBRE DE CATEGORIA
		const regex = new RegExp(termino, 'i');

		const [total, categorias] = await Promise.all([
			Categoria.countDocuments({nombre:regex, estado:true}),
			Categoria.find({nombre:regex, estado:true})
		]);

		res.status(200).json({
			total,
			categorias
		});

	} catch (error) {
		console.log(error);
		res.status(400).json({
			error
		});
	}
};

const buscarProductos = async (termino = '', res = response) => {

	const esMongoiD = isValidObjectId(termino);
	console.log(esMongoiD);
	try {
		if (esMongoiD) {
			//* SI LA BUSQUEDA ES POR ID DE MONGO
			const producto = await Producto.findById(termino).populate('categoria', 'nombre');
			return res.json({
				results: (producto) ? [producto] : []
			});
		}

		//* SI LA BUSQUEDA ES POR NOMBRE DE PRODUCTO
		const regex = new RegExp(termino, 'i');

		const [total, productos] = await Promise.all([
			Producto.countDocuments({nombre:regex, estado:true}),
			Producto.find({nombre:regex, estado:true}).populate('categoria', 'nombre')
		]);

		res.status(200).json({
			total,
			productos
		});

	} catch (error) {
		console.log(error);
		res.status(400).json({
			error
		});
	}
};

module.exports = { buscar };