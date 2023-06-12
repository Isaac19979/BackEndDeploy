const express = require('express');
var router = express.Router();
var ObjectId = require ('mongoose').Types.ObjectId;

var { productos } = require ('../models/productos');


router.get('/list',(req,res)=>{
    productos.find((err, docs)=>{
        if(!err) {res.send(docs);}
        else{console.log('Error en encotrar productos'+ JSON.stringify(err,undefined,2)); }
    });
});

router.get('/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro nada con esa id : ${req.params.id}`);

        productos.findById(req.params.id,(err,doc)=>{
        if (!err) {res.send(doc);}
        else{console.log('Error para regresar el producto :' + JSON.stringify(err,undefined,2));}
    });

});

router.post('/',(req, res) =>{
    var product = new productos({
        Nombre: req.body.Nombre,
        fechaIngreso: req.body.fechaIngreso,
        detalles: req.body.detalles,
        Cantidad: req.body.Cantidad,
    });
    product.save((err, doc) => {
        if(!err) {res.send(doc); }
        else{ console.log('Error en guardar productos:' +JSON.stringify(err, undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);

    var product = {
        Nombre: req.body.Nombre,
        fechaIngreso: req.body.fechaIngreso,
        detalles: req.body.detalles,
        Cantidad: req.body.Cantidad,
    };
    productos.findByIdAndUpdate(req.params.id, {$set: product}, {new: true}, (err,doc) =>{
        if(!err) {res.send(doc)}
        else{console.log('Error en actualizar el producto:' + JSON.stringify(err.undefined,2));}
    });
});

router.delete('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);

        productos.findByIdAndRemove(req.params.id,(err,doc) =>{
        if (!err){res.send(doc);}
        else{console.log('Error en eliminar un producto:'+JSON.stringify(err,undefined,2));}
    });
})


module.exports = router;