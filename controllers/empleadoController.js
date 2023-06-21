const express = require('express');
var router = express.Router();
var ObjectId = require ('mongoose').Types.ObjectId;

var { empleados } = require ('../models/empleados');


router.get('/list',(req,res)=>{
    empleados.find((err, docs)=>{
        if(!err) {res.send(docs);}
        else{console.log('Error en encotrar empleados'+ JSON.stringify(err,undefined,2)); }
    });
});

router.get('/:id',(req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro nada con esa id : ${req.params.id}`);

        empleados.findById(req.params.id,(err,doc)=>{
        if (!err) {res.send(doc);}
        else{console.log('Error para regresar el empleado :' + JSON.stringify(err,undefined,2));}
    });

});

router.post('/',(req, res) => {
    var emp = new empleados({
        Cedula: req.body.Cedula,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Nacionalidad: req.body.Nacionalidad,
        FechaNacimiento: req.body.FechaNacimiento,
    });

    // Verificar si la cédula ya existe
    empleados.findOne({ Cedula: req.body.Cedula }, (err, empleadoExistente) => {
        if (empleadoExistente) {
            return res.status(400).send('Ya existe un empleado con esta cédula');
        } else {
            emp.save((err, doc) => {
                if(!err) {res.send(doc); }
                else { console.log('Error en guardar empleados:' + JSON.stringify(err, undefined, 2)); }
            });
        }
    });
});

router.put('/:id',(req,res)=>{
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);
    }

    var emp = {
        Cedula: req.body.Cedula,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Nacionalidad: req.body.Nacionalidad,
        FechaNacimiento: req.body.FechaNacimiento,
    };

    // Verificar si la cédula ya existe
    empleados.findOne({ Cedula: req.body.Cedula, _id: { $ne: req.params.id } }, (err, empleadoExistente) => {
        if (empleadoExistente) {
            return res.status(400).send('Ya existe un empleado con esta cédula');
        } else {
            empleados.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err,doc) =>{
                if(!err) {res.send(doc)}
                else{console.log('Error en actualizar el empleado:' + JSON.stringify(err, undefined, 2));}
            });
        }
    });
});


router.delete('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No hay registro con ese id: ${req.params.id}`);

        empleados.findByIdAndRemove(req.params.id,(err,doc) =>{
        if (!err){res.send(doc);}
        else{console.log('Error en eliminar un empleado:'+JSON.stringify(err,undefined,2));}
    });
})

module.exports = router;