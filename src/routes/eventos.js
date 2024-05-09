const express = require("express");
const router = express.Router(); // Manejador de rutas de express
const EventoSchema = require("../models/eventos");

// Nueva publicación
router.post("/evento", (req, res) => {
    const nuevoEvento = new EventoSchema(req.body);
    nuevoEvento
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Consultar todas las publicaciones
router.get("/evento", (req, res) => {
    EventoSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Consultar una publicación por su ID
router.get("/evento/:id", (req, res) => {
    const { id } = req.params;
    EventoSchema.findById(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Evento no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Modificar una publicación por ID
router.put("/evento/:id", (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    EventoSchema.findByIdAndUpdate(id, { titulo, descripcion }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Evento no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar una publicación por ID
router.delete("/evento/:id", (req, res) => {
    const { id } = req.params;
    EventoSchema.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Evento no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;

