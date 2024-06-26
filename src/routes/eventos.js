const express = require("express"); // Importa el módulo express
const router = express.Router(); // Crea un nuevo enrutador de express

// Manejador de rutas de express
const UsuarioSchema = require("../models/usuarios");
const EventoSchema = require("../models/eventos"); // Importa el esquema de eventos desde el archivo ../models/eventos
const verifyToken = require("./validar_token"); // Importa la función verifyToken desde el archivo ./validar_token

// Nuevo evento
router.post("/evento/crear", verifyToken, (req, res) => {
  const nuevoEvento = new EventoSchema(req.body);

  nuevoEvento.save()
    .then((data) => {
      res.status(201).json(data); // Cambiamos el código de estado a 201 para indicar que se creó un nuevo recurso
    })
    .catch((error) => {
      res.status(400).json({ message: error.message }); // Cambiamos el código de estado a 400 en caso de error de validación
    });
});


// Consultar todos los eventos
router.get("/evento/buscar", verifyToken, (req, res) => { // Ruta GET para obtener todos los eventos
  EventoSchema.find() // Encuentra todos los documentos en la colección de eventos
    .then((data) => res.json(data)) // Si se encuentra correctamente, envía los datos de los eventos como respuesta
    .catch((error) => res.status(500).json({ message: error.message })); // Si ocurre un error, envía un mensaje de error con código 500
});

// Consultar un evento por su ID
router.get("/evento/buscar/:id", verifyToken, (req, res) => { // Ruta GET para obtener un evento por su ID
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
router.put("/evento/modificar/:id", verifyToken, (req, res) => { // Ruta PUT para actualizar un evento por su ID
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
router.delete("/evento/eliminar/:id", verifyToken, (req, res) => { // Ruta DELETE para eliminar un evento por su ID
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

router.get('/evento/SegunIntereses/:id', (req, res) => {
  const { id } = req.params;
  var interesesABuscar = [];
  // Intereses específicos a buscar
  const Usuario = UsuarioSchema
    .findById(id).then((data) => {

      interesesABuscar = data.intereses;

      //console.log("INTERRES" + interesesABuscar)
      //console.log(interesesABuscar);
      const regex = interesesABuscar.join("|");
      // Consulta MongoDB para buscar eventos que se relacionen con los id mencionados
      EventoSchema.find({ titulo: { $regex: regex, $options: 'i' } })
        .then(result => {
          // Resultado de la consulta
          //console.log('Resultados:', result);
          // Envío de los resultados al cliente
          res.send(result);
        })
        .catch(err => {
          //console.error('Error al buscar eventos:', err);
          // Manejo de error
          res.status(500).send('Error interno del servidor');
        });
    });



});

module.exports = router; // Exporta el enrutador para ser utilizado en otros archivos

