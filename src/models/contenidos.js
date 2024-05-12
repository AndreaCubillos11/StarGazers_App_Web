const mongoose = require("mongoose"); // importando el componente mogoose
const ContenidoSchema = mongoose.Schema({


    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: { //*se encarga de distinguir si el enlace dirigira hacia un articulo, curso, tutorial, simulacion 3D o QR de Realidad Aumentada
        type: Number,
        required: true
    },
    EnlaceContenido: {
        type: [String], //URL de redirección hacia el contenido (QR, video, documento, etc)
        required: false
    }

});

module.exports = mongoose.model("Contenido", ContenidoSchema);

