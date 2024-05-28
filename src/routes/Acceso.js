const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios"); // Importar el modelo Usuario
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/*
router.post('/login', async (req, res) => {
    const { correo, clave } = req.body;

    try {
        // Buscar al usuario en la base de datos por su correo electrónico
        const usuario = await Usuario.findOne({ correo });

        // Si no se encuentra el usuario, enviar un mensaje de error
        if (!usuario) {
            return res.status(404).json({ error: " ¡Usuario no encontrado!" });
        }

        // Verificar la contraseña
        const claveValida = await usuario.validarClave(clave);
        if (!claveValida) {
            return res.status(401).json({ error: "¡Contraseña incorrecta!" });
        }

        // Si la contraseña es válida, devolver el usuario en formato JSON como respuesta
        res.json(usuario);
    } catch (error) {
        // Manejar cualquier error y enviar una respuesta de error al cliente
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Hubo un error al iniciar sesión." });
    }
});
* */


module.exports = router;
