const { Router } = require('express');
const { check } = require('express-validator');
const validarJWT = require('../middlewares/validat-JWT');
const { validarCampos } = require('../middlewares/validar-campos');
const { postCategoria, getCategorias, getCategoriaPorID, putCategoria, deleteCategorias } = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db.validators');
const { esAdminRol } = require('../middlewares/validar-rol');

const router = Router();


//* SE OBTIENEN TODAS LAS CATEGORIAS - PÚBLICA
router.get('/', getCategorias);

//* SE OBTIENE UNA CATEGORIA EN ESPECIFICO - PÚBLICO
router.get('/:id',[
	check('id', 'Debe ser un ID de mongo valido').isMongoId(),
	check('id').custom((id)=> existeCategoria(id)),
	validarCampos
], getCategoriaPorID);

//* CREAR CATEGORIA - PRIVADO - CUALQUIERA CON TOKEN AUTORIZADO
router.post('/', [ 
	validarJWT,
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	validarCampos 
], postCategoria); 

//* ACTUALIZA CATEGORIA - PRIVADO - CUALQUIERA CON TOKEN AUTORIZADO
router.put('/:id',[
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('id', 'Debe ser un ID de mongo valido').isMongoId(),
	check('id').custom((id)=> existeCategoria(id)),
	validarJWT,
	validarCampos
], putCategoria);

//* BORRA CATEGORIA - SOLO ADMID
router.delete('/:id',[
	validarJWT,
	check('id', 'Debe ser un ID de mongo valido').isMongoId(),
	check('id').custom((id)=> existeCategoria(id)),
	esAdminRol,
	validarCampos
], deleteCategorias);

module.exports = router;