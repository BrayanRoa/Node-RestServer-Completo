const express = require('express');
const cors    = require('cors');

class Server{

    constructor(){
        this.app  = express();
        this.PORT = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        //* MIDDLEWARES
        this.middlewares();

        //* RUTAS
        this.routes();
    }

    middlewares(){
        this.app.use( express.static('public') );
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.text() );
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))
    }

    listen(){
        this.app.listen(this.PORT, ()=>{
            console.log(`Server running on port ${this.PORT}`);
        })
    }
}

module.exports = Server;