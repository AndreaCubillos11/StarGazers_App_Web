const express = require("express");
const router = express.Router(); // Manejador de rutas de express
const PublicacioneSchema = require("../models/publicaciones");
const verifyToken = require('./validar_token');

// Nueva publicación
router.post("/publicaciones", (req, res) => {
    const nuevaPublicacion = new PublicacioneSchema(req.body);
    nuevaPublicacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Consultar todas las publicaciones
router.get("/publicaciones", verifyToken, (req, res) => {
    PublicacioneSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Consultar una publicación por su ID
router.get("/publicaciones/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    PublicacioneSchema.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Publicación no encontrada" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Modificar una publicación por ID
router.put("/publicaciones/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { imagenes, contenido } = req.body;
    PublicacioneSchema.findByIdAndUpdate(id, { imagenes, contenido }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Publicación no encontrada" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar una publicación por ID
router.delete("/publicaciones/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    PublicacioneSchema.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Publicación no encontrada" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;




















/*const express = require("express");
const router = express.Router(); //manejador de rutas de express
const PublicacioneSchema = require("../models/publicaciones.js");

//Nueva publicación
router.post("/publicaciones", (req, res) => {
    const publicaciones = PublicacioneSchema(req.body);
    publicaciones
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;

//Consultar todas las publicaciones
router.get("/publicaciones", (req, res) => {
    PublicacioneSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar una publicación por su ID
router.get("/publicaciones/:id", (req, res) => {
    const { id } = req.params;
    PublicacioneSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Modificar una publicación por ID
router.put("/publicaciones/:id", (req, res) => {
    const { id } = req.params;
    const { imagenes, contenido} = req.body;
    PublicacioneSchema
        .updateOne({ _id: id }, {
            $set: { imagenes, contenido }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Eliminar una publicación por ID

router.delete("/publicaciones/:id", (req, res) => {
    const { id } = req.params;
    PublicacioneSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});

*/