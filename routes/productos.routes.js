const { Router } = require('express');
const { check, param } = require('express-validator');
const { obtenerProductos, obtenerProductoPorId, agregarProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos.controller');
const { existeCategoria, existeProductoPorId } = require('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validat-JWT');

const router = Router();

router.get('/', [
	// validarJWT,
	// validarCampos
], obtenerProductos);

router.get('/:id', [
	check('id', 'No es un ID de mongo válido').isMongoId(),
	param('id').custom((id) => existeProductoPorId(id)),
	validarJWT,
	validarCampos
], obtenerProductoPorId);

router.post('/', [
	validarJWT,
	check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
	check('categoria', 'No es un ID de mongo').isMongoId(),
	check('categoria').custom((id) => existeCategoria(id)),
	validarCampos
], agregarProducto);

router.put('/:id', [
	validarJWT,
	check('id', 'No es un ID de mongo').isMongoId(),
	param('id').custom((id) => existeProductoPorId(id)),
	validarCampos
], actualizarProducto);

router.delete('/:id', [
	validarJWT,
	param('id', 'No es un ID de mongo').isMongoId(),
	param('id').custom((id) => existeProductoPorId(id)),
	validarCampos
], eliminarProducto);

module.exports = router;