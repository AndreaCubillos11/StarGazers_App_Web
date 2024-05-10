const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios"); // Importar el modelo Usuario

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
        res.json(nuevoUsuario);
    } catch (error) {
        // Manejar cualquier error y enviar una respuesta de error al cliente
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ error: "Hubo un error al registrar el usuario." });
    }
});

module.exports = router;
