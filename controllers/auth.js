const { response } = require ('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} =require('../helpers/jwt')



const crearUsuario = async(req,res = response) =>{

    const {email,nombre,contraseña} = req.body
    // console.log(email,nombre,contraseña); //atrapando los datos

    try {

    //Verificar el Email
    const usuario = await Usuario.findOne({email});

    if(usuario){
        return res.status(400).json({
            ok:false,
            msg: 'El usuario ya existe con este email'
        });
    }

    //Crear usuario con el modelo
    const dbUser = new Usuario(req.body);

    //Hashear la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.contraseña = bcrypt.hashSync(contraseña, salt);

    //Generar el JWT
    const token = await generarJWT(dbUser.id, nombre);


    //Crear usuario de base de datos
    dbUser.save();

    //Generar respuesta exitosa
    return res.status(201).json({
        ok:true,
        uid: dbUser.id,
        nombre,
        token   

    });
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con los administrador'
        });
    }

}

const loginUsuario = async(req,res = response) =>{


    const {email,contraseña} = req.body
    // console.log(email,contraseña);

    try {

        const dbUser = await Usuario.findOne({email});

        if(!dbUser){
            return res.status(400).json({
                ok:false,
                msg:'Credenciales invalidas'
            });
        }

        //Confimar si la contraseña hace match

        const validPassword = bcrypt.compareSync( contraseña, dbUser.contraseña );

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Credenciales invalidas'
            });
        }

        //Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.nombre);

        //Respuesta del servicio
        return res.json({
            ok:true,
            uid: dbUser.id,
            name: dbUser.name,
            token

        });
        
    } catch (error) {
        console.log(erro);

        return res.json({
            ok:false,
            msg:'Hable con el administrador'
        });   
    }

 
}

const revalidarToken = async(req,res = response) =>{

    const {uid,name} = req;

    //Generar el JWT
    const token = await generarJWT(uid, name);

    return res.json({
        ok:true,
        uid,
        name,
        token

    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}




