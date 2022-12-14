/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos } = require('../controllers/uploads.controller');

const { validarCampos } = require('../middlewares/validar-campos');
// const { check } = require('express-validator');

const router = Router();

router.post('/', cargarArchivos);


module.exports = router;
