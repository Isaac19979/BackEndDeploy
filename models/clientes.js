const mongoose =require('mongoose');

var clientes = mongoose.model('clientes',{
    Cedula:{type:String},
    Nombre:{type: String},
    Apellidos:{type:String},
    fechaIngreso:{type:Date},
    Cantidad:{type:Number}
});

module.exports = {clientes};