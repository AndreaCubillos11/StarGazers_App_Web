const mongoose = require("mongoose"); // importando el componente mogoose
const UsuarioSchema = mongoose.Schema({
 
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true
        },
        nacionalidad: {
            type: String,
            required: true
        },
        edad: {
            type: Number,
            required: true
        },
        telefono: {
            type: Number,
            required: true
        },
        intereses: {
            type: String,
            required: true
        },
        seguidores: {
            type: Number,
            required: false,
            private: true
        },
        rol: {
            type: Number,
            required: false,
             // Por defecto, los usuarios tienen rol de usuario
        }
    });
    
    module.exports = mongoose.model("Usuario", UsuarioSchema);
    