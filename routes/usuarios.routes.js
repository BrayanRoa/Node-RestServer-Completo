const { Router } = require('express')
const router     = Router();

const { getUsuarios, 
        postUsuario, 
        putUsuario,
        deleteUsuarios } = require('../controllers/usuarios.controller')


router.get('/', getUsuarios);

router.post('/', postUsuario);

router.put('/:id', putUsuario);

router.delete('/', deleteUsuarios);

module.exports = router;