const mongoose = require("mongoose"); // importando el componente mogoose
const ContenidoSchema = mongoose.Schema({
      
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

