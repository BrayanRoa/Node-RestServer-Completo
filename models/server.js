const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

class Server{

	constructor(){
		this.app  = express();
		this.PORT = process.env.PORT || 3000;
		this.usuariosPath = '/api/usuarios';

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
		this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
	}

	listen(){
		this.app.listen(this.PORT, ()=>{
			console.log(`Server running on port ${this.PORT}`);
		});
	}
}

module.exports = Server;