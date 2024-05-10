const mongoose = require("mongoose"); // importando el componente mogoose
const ContenidoSchema = mongoose.Schema({
    /*realidadVirtual: {
        type: [String], //URL DE LA IMAGEN DEL QR
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
    },*/    
    titulo: {
        type: String,
        required: true
    },
    tipoContenido: {/* este campo sera usado para distinguir los cinco tipos de contenidos, un valor para simulaciones 3D,*/
        type: Number,/*otro para videos de Realidad Aumentada, otro para cursos, para tutoriales, para articulos, y futuros tipos*/ 
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    EnlaceContenido:{
        type: [String], //URL de redirección hacia el contenido
        required: false
    }

});

module.exports = mongoose.model("Contenido", ContenidoSchema);

