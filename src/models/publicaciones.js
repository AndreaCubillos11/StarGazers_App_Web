const mongoose = require("mongoose"); // importando el componente mogoose
const PublicacioneSchema = mongoose.Schema({
 

    // Usuario que subió la publicación
    usuarioQueLaSubio: {
        type: Schema.Types.ObjectId, // Tipo ObjectID
        ref: 'Usuario', // Referencia al modelo Usuario
        required: true // Campo obligatorio
    },
    // URLs de las imágenes de la publicación
    imagenes: {
        type: [String], // Array de strings
        default: [] // Valor por defecto: array vacío
    },
    // Contenido de la publicación
    contenido: {
        type: String, // Tipo String
        required: true // Campo obligatorio
    },
    // Comentarios de la publicación
    comentarios: [{
        id_Usuario: {
            type: Schema.Types.ObjectId, // Tipo ObjectID
            ref: 'Usuario', // Referencia al modelo Usuario
            required: true // Campo obligatorio
        },
        texto: {
            type: String, // Tipo String
            required: true // Campo obligatorio
        }
    }],
    // Usuarios que han dado "Me gusta" a la publicación
    meGusta: [{
        type: Schema.Types.ObjectId, // Tipo ObjectID
        ref: 'Usuario' // Referencia al modelo Usuario
    }]
});

// Exportar el modelo Publicacion con el esquema definido
module.exports = mongoose.model("Publicacion", PublicacioneSchema);
