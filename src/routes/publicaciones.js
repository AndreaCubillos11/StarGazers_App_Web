const express = require("express");
const router = express.Router(); // Manejador de rutas de express
const PublicacioneSchema = require("../models/publicaciones");
const verifyToken = require('./validar_token');

// Nueva publicación
router.post("/publicaciones/nueva", /*verifyToken,*/  (req, res) => {
    const nuevaPublicacion = new PublicacioneSchema(req.body);
    nuevaPublicacion
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Consultar todas las publicaciones
router.get("/publicaciones", /*verifyToken,*/ (req, res) => {
    PublicacioneSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Consultar una publicación por su ID
router.get("/publicaciones/:id", /*verifyToken,*/  (req, res) => {
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
router.put("/publicaciones/:id", /*verifyToken,*/  (req, res) => {
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
router.delete("/publicaciones/:id", /*verifyToken,*/ (req, res) => {
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