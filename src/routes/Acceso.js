const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuarios"); // Importar el modelo Usuario
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = router;
