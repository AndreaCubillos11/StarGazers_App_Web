const mongoose = require("mongoose"); // importando el componente mogoose
const bcrypt = require("bcrypt"); //Se importa el componente bcrypt
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
    
    // Método para cifrar la contraseña antes de almacenarla en la base de datos
    UsuarioSchema.methods.encryptClave = async function(clave) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(clave, salt);
        return hash;
    };
    
    module.exports = mongoose.model("Usuario", UsuarioSchema);
    