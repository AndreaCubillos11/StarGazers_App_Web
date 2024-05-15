const express = require("express");
const router = express.Router(); //manejador de rutas de express
const UsuarioSchema = require("../models/usuarios");
const bcrypt = require("bcrypt");
const verifyToken = require('./validar_token');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose'); // Importa mongoose

//Nuevo usuario (clave ya encryptada)
router.post("/usuario/registrar",  async (req, res) => {
    const usuario = UsuarioSchema(req.body);             //crea una constante usuario con el body del post
    usuario.clave = await usuario.encryptClave(usuario.clave);    //encrypta la clave y reemplaza aquella dada
    await usuario
        .save()                                          //guardelo
        .then((data) => res.json(data))                  //muestre el usuario
        .catch((error) => res.json({ message: error }))  //atrape el error como mensaje                                 
});


//inicio de sesión-Acceso de usuario  
router.post("/usuario/login",  (req, res) => {
    const { correo, clave } = req.body;             //pide correo y contraseña

    /*const { errorCredenciales } = userSchema.validate(req.body.correo, req.body.clave);
  if (errorCredenciales) return res.status(400).json({ error: error.details[0].message });
  //Buscando el usuario por su dirección de correo
  const usuario = await UsuarioSchema.findOne({ correo: req.body.correo });
  //validando si no se encuentra
  if (!user) return res.status(401).json({ error: "¡Correo no encontrado!" });

    const match = await bcrypt.compare(req.body.clave, usuario.clave);

    if (match) {//si es valida
                const token = jwt.sign(         //*cree un token
                { id: user._id },           //*asociado al id del usuario
                process.env.SECRET,         //*y recibiendo la variable de entorno SECRET
                { expiresIn: 60 * 60 * 24}  //*que expire la sesion tras un día en segundos
            );           
            res.json({
                auth: true,                 //*se autorizo*
                token,                      /*mostrara el token pa copiarlo
                correo,                     
                message:"se inicio la sesion correctamente"
            });
 */

    // Buscar el usuario en la base de datos por correo
    UsuarioSchema.findOne({ correo: correo })       //hallara un 
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
                    auth: true,                 /*se autorizo*/
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
router.get("/Usuario/perfiles/:id", (req, res) => {
    const { id } = req.params;
    UsuarioSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Modificar el usuario por su id
router.put("/usuario/editar/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, telefono, intereses } = req.body;

    // Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID de usuario no válido" });
    }

    UsuarioSchema.updateOne({ _id: id }, {
        $set: { nombre, apellido, edad, telefono, intereses }
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

// Endpoint para inicio de sesión
/*
router.post("/login", (req, res) => {
    const { correo, clave } = req.body;

    // Buscar el usuario en la base de datos por correo
    UsuarioSchema.findOne({ correo: correo })
        .then(user => {
            if (!user) {
                // Si el usuario no existe, devolver un mensaje de error
                return res.status(401).json({ message: "¡Correo no encontrado!" });
            }

            // Verificar si la contraseña es correcta
            if (clave === user.clave) {
                // Si la contraseña es correcta, generar un token JWT
                const token = jwt.sign({ correo: correo }, 'secreto', { expiresIn: '1h' });
                res.json({ token: token });
            } else {
                // Si la contraseña no es correcta, devolver un mensaje de error
                res.status(401).json({ message: "¡Contraseña incorrecta!" });
            }
        })
        .catch(error => {
            // Si hay un error en la consulta a la base de datos, devolver un mensaje de error
            res.status(500).json({ message: "Error en la base de datos", error: error });
        });
});* */





module.exports = router;
