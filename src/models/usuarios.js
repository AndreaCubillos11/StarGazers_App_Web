const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        required: false
    },
    edad: {
        type: Number,
        required: false
    },
    telefono: {
        type: Number,
        required: false
    },
    intereses: {        //¨descripcion del perfil¨, contiene aquella informacion relacionada a la astrologia que busca conocer el usuario
        type: String,
        required: false
    },
    seguidores: {       //cantidad, no el listado
        type: Number,
        required: false
    },
    rol: {
        type: Number,
        required: true, 
    },
    clave: {
        type: String,
        required: true 
    }
});

// Método para cifrar la contraseña antes de almacenarla en la base de datos
UsuarioSchema.methods.encryptClave = async function(clave) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(clave, salt);
    return hash;
};

// Middleware de mongoose para cifrar la contraseña antes de guardarla en la base de datos
UsuarioSchema.pre('save', async function(next) {
    if (this.isModified('clave')) {
        this.clave = await this.encryptClave(this.clave);
    }
    next();
});
module.exports = mongoose.model("Usuario", UsuarioSchema);