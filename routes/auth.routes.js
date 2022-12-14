const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
// const { check } = require('express-validator');

const router = Router();

router.post('/login',[
	check('correo', 'El correo es obligatorio').isEmail(),
	check('password', 'la contraseña es obligatoria').not().isEmpty(),
	validarCampos
], login);

router.post('/google',[
	check('id_token', 'ID Token es necesario').not().isEmpty(),
	validarCampos
], googleSignIn);


module.exports = router;
