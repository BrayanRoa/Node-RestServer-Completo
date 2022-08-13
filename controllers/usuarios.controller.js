const { request, response } = require('express');

const getUsuarios = (req = request, res = response)=>{
    const {q, nombre} = req.query;
    res.json({
        msg:"Get - Api Controller",
        
    })
}

const postUsuario = (req = request, res = response)=>{
    const {nombre, edad} = req.body;
    res.json({
        msg:"POST Api - Controller",
        nombre,
        edad
    })
}

const putUsuario = (req = request, res = response)=>{
    const id = parseInt(req.params.id);
    res.json({
        msg:"PUT Api - Controller",
        id
    })
}

const deleteUsuarios = (req = request, res = response)=>{
    res.json({
        msg:"DELETE Api - Controller"
    })
}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuarios
}