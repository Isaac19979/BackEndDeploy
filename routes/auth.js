const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router= Router();


//Crear un nuevo usuario
router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),  //Se ven en la págin de express validator
    check('email','El email es obligatorio').isEmail(),  //Se ven en la págin de express validator
    check('contraseña','La contraseña es obligatoria').isLength({min : 6}),
    validarCampos
], crearUsuario );

//

//Login de un nuevo usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),  //Se ven en la págin de express validator
    check('contraseña','La contraseña es obligatoria').isLength({min : 6}),
    validarCampos
],loginUsuario);

//Validar y revalidar token
router.get('/renew',validarJWT, revalidarToken);




module.exports = router;
