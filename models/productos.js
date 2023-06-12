const mongoose =require('mongoose');

var productos = mongoose.model('productos',{
    Nombre:{type: String},
    fechaIngreso:{type:Date},
    detalles:{type:String},
    Cantidad:{type:Number}
});

module.exports = {productos};