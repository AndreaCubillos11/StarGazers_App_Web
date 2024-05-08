const mongoose = require("mongoose"); // importando el componente mogoose
const EventoSchema = mongoose.Schema({ //Creamos Schema
    
    titulo: {
        type: String, 
        required: true 
    },
   
    descripcion: {
        type: String, 
        required: true 
    },
   
    participantes: [{
        idUsuario: {
            type: Schema.Types.ObjectId, // Tipo ObjectID
            ref: 'Usuario', // Referencia al modelo Usuario
            required: true // Campo obligatorio
        },
    }]
});

// Exportar el modelo Evento con el esquema definido
module.exports = mongoose.model("Evento", EventoSchema);
