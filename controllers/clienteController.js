const express = require('express');
var router = express.Router();
var ObjectId = require ('mongoose').Types.ObjectId;

var { clientes } = require ('../models/clientes');


// => host:3000/clientes/list
router.get('/list',(req,res)=>{
    clientes.find((err, docs)=>{
        if(!err) {res.send(docs);}
        else{console.log('Error en encotrar clientes'+ JSON.stringify(err,undefined,2)); }
    });
});

router.get('/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro nada con esa id : ${req.params.id}`);

    clientes.findById(req.params.id,(err,doc)=>{
        if (!err) {res.send(doc);}
        else{console.log('Error para regresar los clientes :' + JSON.stringify(err,undefined,2));}
    });

});

router.post('/',(req, res) =>{
    var cliente = new clientes({
        Cedula: req.body.Cedula,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        fechaIngreso: req.body.fechaIngreso,
        Cantidad: req.body.Cantidad,
    });
    cliente.save((err, doc) => {
        if(!err) {res.send(doc); }
        else{ console.log('Error en guardar cliente:' +JSON.stringify(err, undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);

    var cliente = {
        Cedula: req.body.Cedula,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        fechaIngreso: req.body.fechaIngreso,
        Cantidad: req.body.Cantidad,
    };
    clientes.findByIdAndUpdate(req.params.id, {$set: cliente}, {new: true}, (err,doc) =>{
        if(!err) {res.send(doc)}
        else{console.log('Error en actualizar cliente:' + JSON.stringify(err.undefined,2));}
    });
});

router.delete('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);

    clientes.findByIdAndRemove(req.params.id,(err,doc) =>{
        if (!err){res.send(doc);}
        else{console.log('Error en eliminar un cliente:'+JSON.stringify(err,undefined,2));}
    });
})

module.exports = router;