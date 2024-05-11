const express = require("express"); // Importa el módulo express
const router = express.Router(); // Crea un nuevo enrutador de express

// Manejador de rutas de express
const EventoSchema = require("../models/eventos"); // Importa el esquema de eventos desde el archivo ../models/eventos
const verifyToken = require("./validar_token"); // Importa la función verifyToken desde el archivo ./validar_token

// Nuevo evento
router.post("/evento", verifyToken, (req, res) => { // Ruta POST para crear un nuevo evento
  const nuevoEvento = new EventoSchema(req.body); // Crea una nueva instancia de EventoSchema con los datos del cuerpo de la solicitud

  nuevoEvento
    .save() // Guarda el nuevo evento en la base de datos
    .then((data) => res.json(data)) // Si se guarda correctamente, envía los datos del evento como respuesta
    .catch((error) => res.status(500).json({ message: error.message })); // Si ocurre un error, envía un mensaje de error con código 500
});

// Consultar todos los eventos
router.get("/evento", (req, res) => { // Ruta GET para obtener todos los eventos
  EventoSchema.find() // Encuentra todos los documentos en la colección de eventos
    .then((data) => res.json(data)) // Si se encuentra correctamente, envía los datos de los eventos como respuesta
    .catch((error) => res.status(500).json({ message: error.message })); // Si ocurre un error, envía un mensaje de error con código 500
});

// Consultar un evento por su ID
router.get("/evento/:id", verifyToken, (req, res) => { // Ruta GET para obtener un evento por su ID
  const { id } = req.params; // Obtiene el ID del evento desde los parámetros de la solicitud

  EventoSchema.findById(id) // Encuentra el documento con el ID especificado
    .then((data) => {
      if (!data) { // Si no se encuentra el documento
        return res.status(404).json({ message: "Evento no encontrado" }); // Envía un mensaje de error con código 404
      }
      res.json(data); // Si se encuentra el documento, envía los datos del evento como respuesta
    })
    .catch((error) => res.status(500).json({ message: error.message })); // Si ocurre un error, envía un mensaje de error con código 500
});

// Modificar un evento por ID
router.put("/evento/:id", verifyToken, (req, res) => { // Ruta PUT para actualizar un evento por su ID
  const { id } = req.params; // Obtiene el ID del evento desde los parámetros de la solicitud
  const { titulo, descripcion } = req.body; // Obtiene el título y la descripción actualizados desde el cuerpo de la solicitud

  EventoSchema.findByIdAndUpdate(id, { titulo, descripcion }, { new: true }) // Encuentra el documento por su ID y actualiza los campos título y descripción
    .then((data) => {
      if (!data) { // Si no se encuentra el documento
        return res.status(404).json({ message: "Evento no encontrado" }); // Envía un mensaje de error con código 404
      }
      res.json(data); // Si se actualiza correctamente, envía los datos del evento actualizado como respuesta
    })
    .catch((error) => res.status(500).json({ message: error.message })); // Si ocurre un error, envía un mensaje de error con código 500
});

// Eliminar un evento por ID
router.delete("/evento/:id", verifyToken, (req, res) => { // Ruta DELETE para eliminar un evento por su ID
  const { id } = req.params; // Obtiene el ID del evento desde los parámetros de la solicitud

  EventoSchema.findByIdAndDelete(id) // Encuentra el documento por su ID y lo elimina
    .then((data) => {
      if (!data) { // Si no se encuentra el documento
        return res.status(404).json({ message: "Evento no encontrado" }); // Envía un mensaje de error con código 404
      }
      res.json(data); // Si se elimina correctamente, envía los datos del evento eliminado como respuesta
    })
    .catch((error) => res.status(500).json({ message: error.message })); // Si ocurre un error, envía un mensaje de error con código 500
});

module.exports = router; // Exporta el enrutador para ser utilizado en otros archivos

