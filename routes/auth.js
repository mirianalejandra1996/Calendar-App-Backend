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

//  Para crear un bloque de comentarios puedo escribir "/**"  y el se autocompleta

// const router = express.Router()
const router = Router()


// * Create a user

/**
 * @swagger
 * /auth/new:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *             example:
 *               ok: false
 *               msg: User already exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *             example:
 *               ok: false
 *               msg: Please contact with the admin
 */


/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *               password: password123 
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               ok: true
 *               uid: 12345
 *               name: John Doe
 *               token: eyJhbGciOiJIUzI1NiIsIn...
 *       400:
 *         description: Bad request or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *             example:
 *               ok: false
 *               msg: Invalid password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *             example:
 *               ok: false
 *               msg: Please contact with the admin
 */


/**
 * @swagger
 * /auth/renew:
 *   get:
 *     summary: Renewal of a user's token
 *     tags: [User]
 *     security:
 *       - x-token: []
 *     responses:
 *       200:
 *         description: Token renovado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autorizado - Token inválido o no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 msg:
 *                   type: string
 */


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