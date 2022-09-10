/* eslint-disable no-unused-vars */
const { request, response } = require('express');
const Producto = require('../models/producto');


const obtenerProductos = async (req = request, res = response) => {
	try {
		// console.log('HOLA');
		const [total, productos] = await Promise.all([
			Producto.countDocuments({ estado: true }),
			Producto.find({ estado: true })
				.populate('categoria', 'nombre')
				.populate('usuario', 'nombre')
		]);

		res.status(200).json({
			total,
			productos
		});
	} catch (error) {
		console.log(error);
		res.status(400).json(
			error
		);
	}
};

const obtenerProductoPorId = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const producto = await Producto.findById(id);
		// .populate('categoria', 'nombre')
		// .populate('usuario', 'nombre');

		res.status(200).json({
			producto
		});

	} catch (error) {
		console.log(error);
		res.status(400).json({
			error
		});
	}
};

//TODO: REALIZAR LOS CONTROLLERS LOS ROUTES YA ESTAN LISTOS
const agregarProducto = async (req = request, res = response) => {

	try {
		const { usuario, estado, ...body } = req.body;
		const nombre = body.nombre;
		const producto = await Producto.findOne({ nombre });

		if (producto) {
			res.status(400).json({
				msg: `Ya existe un producto con nombre ${body.nombre} este producto`
			});
		}

		const data = {
			// // nombre: body.nombre,
			usuario: req.usuario._id,
			...body
		};

		const crearProducto = new Producto(data);
		crearProducto.save();

		res.status(201).json({
			msg: 'Producto creado con exito!!!',
			crearProducto
		});


	} catch (error) {
		console.log(error);
		res.status(400).json({
			error
		});
	}
};

const actualizarProducto = async (req = request, res = response) => {
	const { id } = req.params;

	const { estado, usuario, ...body } = req.body;


	if (body.nombre) {
		body.nombre.toUpperCase();
	}

	body.usuario = req.usuario._id;

	try {

		const producto = await Producto.findByIdAndUpdate(id, body, { new: true });

		res.status(200).json({
			producto
		});
	} catch (error) {
		res.status(400).json({
			error
		});
	}
};

const eliminarProducto = async (req = request, res = response) => {
	const { id } = req.params;

	try {
		const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

		res.status(200).json({
			producto
		});

	} catch (error) {
		res.status(400).json({
			error
		});
	}
};

module.exports = {
	obtenerProductos,
	obtenerProductoPorId,
	agregarProducto,
	actualizarProducto,
	eliminarProducto
};