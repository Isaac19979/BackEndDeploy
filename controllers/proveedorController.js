const express = require('express');
var router = express.Router();
var ObjectId = require ('mongoose').Types.ObjectId;

var { proveedores } = require ('../models/proveedores');

router.get('/list',(req,res)=>{
    proveedores.find((err, docs)=>{
        if(!err) {res.send(docs);}
        else{console.log('Error en encotrar proveedores'+ JSON.stringify(err,undefined,2)); }
    });
});

router.get('/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro nada con esa id : ${req.params.id}`);

        proveedores.findById(req.params.id,(err,doc)=>{
        if (!err) {res.send(doc);}
        else{console.log('Error para regresar el proveedor :' + JSON.stringify(err,undefined,2));}
    });

});

router.post('/',(req, res) =>{
    var provee = new proveedores({
        Cedula: req.body.Cedula,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        fechaIngreso: req.body.fechaIngreso,
        producto: req.body.producto,
    });
    provee.save((err, doc) => {
        if(!err) {res.send(doc); }
        else{ console.log('Error en guardar proveedores:' +JSON.stringify(err, undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);

    var provee = {
        Cedula: req.body.Cedula,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        fechaIngreso: req.body.fechaIngreso,
        producto: req.body.producto,
    };
    proveedores.findByIdAndUpdate(req.params.id, {$set: provee}, {new: true}, (err,doc) =>{
        if(!err) {res.send(doc)}
        else{console.log('Error en actualizar el proveedor:' + JSON.stringify(err.undefined,2));}
    });
});

router.delete('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);

        proveedores.findByIdAndRemove(req.params.id,(err,doc) =>{
        if (!err){res.send(doc);}
        else{console.log('Error en eliminar un proveedor:'+JSON.stringify(err,undefined,2));}
    });
})





module.exports = router;