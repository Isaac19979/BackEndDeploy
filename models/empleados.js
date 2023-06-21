const mongoose =require('mongoose');

var empleados = mongoose.model('empleados',{
    Cedula:{type:String, unique: true},
    Nombre:{type: String},
    Apellidos:{type:String},
    Nacionalidad:{type:String},
    FechaNacimiento:{type:Date},
});

module.exports = {empleados};