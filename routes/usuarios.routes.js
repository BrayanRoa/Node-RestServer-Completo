const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db.validators');
const { getUsuarios, 
	postUsuario, 
	putUsuario,
	deleteUsuarios } = require('../controllers/usuarios.controller');
	
const router = Router();

router.get('/', getUsuarios);

router.post('/',[
	check('nombre', 'El nombre no es valido').not().isEmpty(),
	check('password', 'El password debe ser de minimo 6 carcateres').isLength({min:6}),
	check('correo', 'El correo no es valido').isEmail(),
	check('correo').custom((correo) => emailExiste(correo)),
	check('rol').custom((rol) => esRolValido(rol)),
	validarCampos
], postUsuario);

router.put('/:id',[
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom((id) => existeUsuarioPorId(id)),
	check('rol').custom((rol) => esRolValido(rol)),
	validarCampos
], putUsuario);

router.delete('/:id',[
	check('id', 'No es un ID válido').isMongoId(),
	check('id').custom((id) => existeUsuarioPorId(id)),
	validarCampos
], deleteUsuarios);

module.exports = router;