// Es bueno dejar este tipo de comentarios como abajo para estar claro
// de la ruta
/*
    Rutas de usuarios / Auth
    host + api/auth
*/


// const express = require('express')
const { Router } = require('express')
const { check } = require('express-validator')
const { fieldsValidator } = require('../middlewares/fields-validator')
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-validator');



// const router = express.Router()
const router = Router()


// router.post('/new', createUser);

// dentro del "[]" habría una colección de middlewares
router.post(
    '/new',
    [ // middlewares
        check('name', 'name is required').not().isEmpty(),
        check('email', 'email is required').isEmail(),
        check('password', 'password should have at least 6 characters').isLength({ min: 6}),
        fieldsValidator
    ],
    createUser
);

router.post(
    '/',
    [ // middlewares
        check('email', 'email is required').isEmail(),
        check('password', 'password should have at least 6 characters').isLength({ min: 6}),
        fieldsValidator
    ]
    , loginUser
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;