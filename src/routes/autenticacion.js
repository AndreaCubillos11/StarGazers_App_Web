const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios"); // Importar el modelo Usuario
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/signup', async (req, res) => {
    const { nombre, apellido, correo, clave, nacionalidad, edad, telefono, intereses } = req.body;

    try {
        // Crear un nuevo usuario con los datos proporcionados
        const nuevoUsuario = new Usuario({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            clave: clave,
            nacionalidad: nacionalidad,
            edad: edad,
            telefono: telefono,
            intereses: intereses
        });

        // Cifrar la contraseña antes de guardarla en la base de datos
        nuevoUsuario.clave = await nuevoUsuario.encryptClave(nuevoUsuario.clave);


        // Guardar el nuevo usuario en la base de datos
        await nuevoUsuario.save();

        // Devolver el nuevo usuario en formato JSON como respuesta
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 60 * 60 * 24, //un día en segundos
        });
        res.json({
            auth: true,
            token,
            message:'se agrego el usuario:',
            nuevoUsuario
        });


        /*res.json({
            message: "Usuario guardado."
        });*/

    } catch (error) {
        // Manejar cualquier error y enviar una respuesta de error al cliente
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Hubo un error al registrar el usuario." });
    }
});

router.post("/login", async (req, res) => {
    // validaciones
    const { error } = nuevoUsuario.validate(req.body.correo, req.body.clave);
    if (error) return res.status(400).json({ error: error.details[0].message });
    //Buscando el usuario por su dirección de correo
    const user = await nuevoUsuario.findOne({ correo: req.body.correo });
    //validando si no se encuentra
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
    //Transformando la contraseña a su valor original para 
    //compararla con la clave que se ingresa en el inicio de sesión
    const validPassword = await bcrypt.compare(req.body.clave, user.clave);
    if (!validPassword)
        return res.status(400).json({ error: "Clave no válida" });
    res.json({
        error: null,
        data: "Bienvenido(a) a Stargazers",
    });
});


module.exports = router;
