const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

class Server{

	constructor(){
		this.app  = express();
		this.PORT = process.env.PORT || 3000;

		//* ARREGLO DE RUTAS
		this.paths = {
			auth      :'/api/auth',
			usuarios  :'/api/usuarios',
			categorias:'/api/categorias',
			productos :'/api/productos',
			buscar    :'/api/buscar'
		};
		//* CONEXION A BD
		this.conectarDB();

		//* MIDDLEWARES
		this.middlewares();

		//* RUTAS
		this.routes();
	}

	async conectarDB(){
		await dbConnection();
	}

	middlewares(){
		this.app.use( express.static('public') );
		this.app.use( cors() );
		this.app.use( express.json() );
		this.app.use( express.text() );
	}

	routes(){
		this.app.use(this.paths.auth, require('../routes/auth.routes'));
		this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
		this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
		this.app.use(this.paths.productos, require('../routes/productos.routes'));
		this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
	}

	listen(){
		this.app.listen(this.PORT, ()=>{
			console.log(`Server running on port ${this.PORT}`);
		});
	}
}

module.exports = Server;