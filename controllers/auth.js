const { response } = require('express');
const { validationResult } = require('express-validator');

const loginUsuario = (req, res = response ) => {

    
    const { rut, password } = req.body 

    res.status(201).json({
        ok: true,
        msg: "login usuario",
        rut,
        password
    })
}

const revalidarToken = (req, res = response ) => {
    res.json({
        ok: true,
        msg: "revalidar token"
    })
}
module.exports = {
    loginUsuario,
    revalidarToken
}