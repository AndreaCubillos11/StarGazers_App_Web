const express = require("express");
const router = express.Router(); //manejador de rutas de express
const ContenidoSchema = require("../models/contenidos");
//Nuevo usuario
router.post("/contenidos", (req, res) => {
    const nuevoContenido = ContenidoSchema(req.body);
    nuevoContenido
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;

//Consultar todos los usuarios
router.get("/contenido", (req, res) => {
    ContenidoSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar un usuario por su id
router.get("/contenido/:id", (req, res) => {
    const { id } = req.params;
    ContenidoSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Modificar el usuarios por su id
router.put("/contenido/:id", (req, res) => {
    const { id } = req.params;
    const { realidadVirtual, simulacion, articulos, cursos, tutoriales, titulo, descripcion } = req.body;
    UsuarioSchema
        .updateOne({ _id: id }, {
            $set: { realidadVirtual, simulacion, articulos, cursos, tutoriales, titulo, descripcion  }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Eliminar un usuario por su id

router.delete("/contenido/:id", (req, res) => {
    const { id } = req.params;
    ContenidoSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

