const mongoose =require('mongoose');

var proveedores = mongoose.model('proveedores',{
    Cedula:{type:String},
    Nombre:{type: String},
    Apellidos:{type:String},
    fechaIngreso:{type:Date},
    producto:{type:String}
});

module.exports = {proveedores};