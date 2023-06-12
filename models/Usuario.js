const mongoose = require('mongoose')
const { Schema } = require("mongoose");



const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    contraseña:{
        type: String,
        required:true
    },
})

module.exports = mongoose.model('Usuario', UsuarioSchema) 


