const mongoose = require("mongoose"); // importando el componente mogoose
const ContenidoSchema = mongoose.Schema({

    realidadVirtual: {
        type: [string], //URL DE LA IMAGEN DEL QR
        required: false
    },
    simulacion: {
        type: [String], //URL VIDEOS
        required: false
    },
    artículos: {
        type: String,
        required: false
    },
    cursos: {
        type: String,
        required: true
    },
    tutoriales: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Contenido", ContenidoSchema);

