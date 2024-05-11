const parser = require("body-parser"); // Requiere el módulo body-parser para analizar las solicitudes entrantes.
const express = require('express');
const app = express(); // Crea una nueva aplicación Express.
const port = 3000; // Define el puerto en el que la aplicación escuchará las solicitudes.
const UsuariosRoutes = require("./routes/usuarios"); // Requiere el archivo de rutas para usuarios.
const PublicacionesRoutes = require("./routes/publicaciones"); // Requiere el archivo de rutas para publicaciones.
const EventoRoutes = require("./routes/eventos"); // Requiere el archivo de rutas para eventos.
const ContenidoRoutes = require("./routes/contenido"); // Requiere el archivo de rutas para contenido.
const authRoutes = require ("./routes/autenticacion"); // Requiere el archivo de rutas para autenticación.
const mongoose = require("mongoose"); // Requiere el módulo mongoose para interactuar con MongoDB.
require('dotenv').config(); // Requiere el módulo dotenv para cargar variables de entorno desde un archivo .env.

// Middleware para analizar solicitudes codificadas en URL.
app.use(parser.urlencoded({ extended: false }));
// Middleware para analizar solicitudes en formato JSON.
app.use(parser.json());
// Gestión de las rutas usando el middleware.
app.use("/api", PublicacionesRoutes);
app.use("/api", UsuariosRoutes);
app.use("/api", EventoRoutes);
app.use("/api", ContenidoRoutes);
app.use("/api", authRoutes);
// Middleware para analizar solicitudes en formato JSON.
app.use(express.json());

// Conexión a la base de datos MongoDB utilizando la URI especificada en el archivo .env.
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa")) // Log de éxito en la conexión.
    .catch((error) => console.log(error)); // Log de errores en la conexión.

// La aplicación escucha las solicitudes en el puerto especificado.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
