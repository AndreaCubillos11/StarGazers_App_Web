const express = require("express");
const router = express.Router(); //manejador de rutas de express
const UsuarioSchema = require("../models/usuarios");
//Nuevo usuario
router.post("/usuario", (req, res) => {
    const usuario = UsuarioSchema(req.body);
    usuario
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;

//Consultar todos los usuarios
router.get("/Usuario", (req, res) => {
    UsuarioSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar un usuario por su id
router.get("/Usuario/:id", (req, res) => {
    const { id } = req.params;
    UsuarioSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Modificar el usuarios por su id
router.put("/Usuario/:id", (req, res) => {
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

router.delete("/Usuario/:id", (req, res) => {
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

