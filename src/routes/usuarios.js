const express = require("express");
const router = express.Router(); //manejador de rutas de express
const UsuarioSchema = require("../models/usuarios");
const bcrypt = require("bcrypt");
const verifyToken = require('./validar_token');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose'); // Importa mongoose

//Nuevo usuario (clave ya encryptada)
router.post("/usuario/registrar", async (req, res) => {
    const usuario = UsuarioSchema(req.body);             //crea una constante usuario con el body del post
    var arregloIntereses = (req.body.intereses.split(','));
    for (let index = 0; index < arregloIntereses.length; index++) {
        arregloIntereses[index] = arregloIntereses[index].trim();        
    }
    usuario.intereses = arregloIntereses;
    usuario.clave = await usuario.encryptClave(usuario.clave);    //encrypta la clave y reemplaza aquella dada
    await usuario
        .save()                                          //guardelo
        .then((data) => res.json(data))                  //muestre el usuario
        .catch((error) => res.json({ message: error }))  //atrape el error como mensaje                                 
});


//inicio de sesión-Acceso de usuario  
router.post("/usuario/login", (req, res) => {
    const { correo, clave } = req.body;             //pide correo y contraseña
    // Buscar el usuario en la base de datos por correo
    UsuarioSchema.findOne({ correo: correo })       //hallara un usuario cuyo correo coincida con el dado
        .then(async usuario => {
            if (!usuario) {
                return res.status(401).json({ message: "¡Correo no encontrado!" });
            }
            const correo = usuario.correo;
            const nombre = usuario.nombre;
            const apellido = usuario.apellido;
            const rol = usuario.rol;
            const id = usuario._id;
            // Verificar si la contraseña es correcta utilizando bcrypt
            const match = await bcrypt.compare(clave, usuario.clave);

            if (match) {//si es valida
                const expiresIn = 24 * 60 * 60;
                accessToken = jwt.sign(
                    { id: usuario.id },
                    process.env.SECRET, {
                    expiresIn: expiresIn
                });
                res.json({
                    auth: true,                 /*se autorizo*/
                    accessToken,                /*mostrara el token pa copiarlo*/
                    correo,
                    nombre,
                    apellido,
                    rol,
                    id,
                    message: "se inicio la sesion correctamente"
                });
            } else {
                res.status(401).json({ message: "¡Contraseña incorrecta!" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error en la base de datos", error: error });
        });
});

//Consultar todos los usuarios
router.get("/usuario/perfiles", (req, res) => {
    UsuarioSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar un usuario por su id
router.get("/usuario/perfiles/:id", (req, res) => {
    const { id } = req.params;
    UsuarioSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar Intereses del Usuarios
router.get("/usuario/perfiles/interes/:id", (req, res) => {
    const { id } = req.params;
    UsuarioSchema
        .findById(id)
        .then((data) => res.json(data.intereses))
        .catch((error) => res.json({ message: error }));
});

//Modificar el usuario por su id
router.put("/usuario/editar/:id", verifyToken, (req, res) => {

    /*const usuario = UsuarioSchema(req.body);*/
    const { id } = req.params;
    const { nombre, apellido, nacionalidad, telefono} = req.body;
    console.log('intereses:'+req.body.intereses)
    var arregloIntereses = req.body.intereses;

    if(!Array.isArray(arregloIntereses)){
        arregloIntereses = (req.body.intereses.split(','));
    }
    for (let index = 0; index < arregloIntereses.length; index++) {
        arregloIntereses[index] = arregloIntereses[index].trim();        
    }
    var intereses = arregloIntereses;
    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID de usuario no válido" });
    }

    UsuarioSchema.updateOne({ _id: id }, {
        $set: { nombre, apellido, nacionalidad, telefono, intereses }
    })
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar un usuario por su ID
router.delete("/usuario/borrar/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    UsuarioSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

module.exports = router;
