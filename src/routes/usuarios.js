const express = require("express");
const router = express.Router(); //manejador de rutas de express
const UsuarioSchema = require("../models/usuarios");
const bcrypt = require("bcrypt");
const verifyToken = require('./validar_token');
const jwt = require("jsonwebtoken");

//Nuevo usuario (clave ya encryptada)
router.post("/usuario/registrar",  async (req, res) => {
    const usuario = UsuarioSchema(req.body);                         //crea una constante usuario con el body del post
    usuario.clave = await usuario.encryptClave(usuario.clave);      //encrypta la clave y reemplaza aquella dada
    await usuario
        .save()                                                     //guardelo
        .then((data) => res.json(data))                             //muestre el usuario
        .catch((error) => res.json({ message: error }))             //atrape el error como mensaje                                 
});


//inicio de sesión-Acceso de usuario  
router.post("/usuario/login",  (req, res) => {
    const { correo, clave } = req.body;             //pide correo y contraseña
 
    // Buscar el usuario en la base de datos por correo
    UsuarioSchema.findOne({ correo: correo })       //hallara un usuario con el correo dado
        .then(async usuario => {
            if (!usuario) {
                return res.status(401).json({ message: "¡Correo no encontrado!" });
            }

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
                    auth: true,                       /*se autorizo*/
                    accessToken,                      /*mostrara el token pa copiarlo*/
                    correo,                     
                    message:"se inicio la sesion correctamente"
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

//Modificar el usuarios por su id
router.put("/usuario/editar/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, telefono, intereses } = req.body;
    UsuarioSchema
        .updateOne({ _id: id }, {
            $set: { nombre, apellido, edad, telefono, intereses }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Eliminar un usuario por su id
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
