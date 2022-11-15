const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuario");

const loginUsuario = async(req, res = response ) => {

    
    const { rut, password } = req.body 
    try {
        /* const usuario = new Usuario( req.body );
        await usuario.save(); */

        let usuario = await Usuario.findOne({ rut });

        // si el rut existe
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "usuario no existente",
                rut
            });
        }

        //si la contraseña es correcta
        if ( password !== usuario.password ) {
            return res.status(400).json({
                ok: false,
                msg: "contraseña invalida",
                rut
            });
        }

        //Generar nuestro JWT
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            rut
        });  
    
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error",
           
        });  
    }
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