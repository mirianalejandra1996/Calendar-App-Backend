// /**
//  * @swagger
//  * /api/auth:
//  *   post:
//  *     summary: Login a user
//  *     tags: [User]
//  *     parameters:
//  *       - name: email
//  *         in: formData
//  *         description: The user email for login
//  *         required: true
//  *         type: string
//  *         default: johndoe@example.com
//  *       - name: password
//  *         in: formData
//  *         description: The password for login in clear text
//  *         required: false
//  *         type: string
//  *         default: password123
//  *     requestBody:
//  *       required: false
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *             example:
//  *               email: johndoe@example.com
//  *               password: password123 
//  *     responses:
//  *       200:
//  *         description: User logged in successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 uid:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 token:
//  *                   type: string
//  *             example:
//  *               ok: true
//  *               uid: 12345
//  *               name: John Doe
//  *               token: eyJhbGciOiJIUzI1NiIsIn...
//  *       400:
//  *         description: Bad request or invalid credentials
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 msg:
//  *                   type: string
//  *             example:
//  *               ok: false
//  *               msg: Invalid password
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 msg:
//  *                   type: string
//  *             example:
//  *               ok: false
//  *               msg: Please contact with the admin
//  */

// /**
//  * @swagger
//  * /api/auth:
//  *   post:
//  *     summary: Login a user
//  *     tags: [User]
//  *     requestBody:
//  *       required: false
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *             example:
//  *               email: johndoe@example.com
//  *               password: password123 
//  *     responses:
//  *       200:
//  *         description: User logged in successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 uid:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 token:
//  *                   type: string
//  *             example:
//  *               ok: true
//  *               uid: 12345
//  *               name: John Doe
//  *               token: eyJhbGciOiJIUzI1NiIsIn...
//  *       400:
//  *         description: Bad request or invalid credentials
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 msg:
//  *                   type: string
//  *             example:
//  *               ok: false
//  *               msg: Invalid password
//  *       500:
//  *         description: Internal server error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 msg:
//  *                   type: string
//  *             example:
//  *               ok: false
//  *               msg: Please contact with the admin
//  */


// /**
//  * @swagger
//  * /api/auth/renew:
//  *   get:
//  *     summary: Renovar un token de usuario
//  *     tags: [User]
//  *     parameters:
//  *       - in: header
//  *         name: x-token
//  *         schema:
//  *           type: string
//  *         description: Token personalizado
//  *     security:
//  *       - x-token: []
//  *     responses:
//  *       200:
//  *         description: Token renovado exitosamente
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 token:
//  *                   type: string
//  *                 uid:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *       401:
//  *         description: No autorizado - Token inválido o no proporcionado
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 ok:
//  *                   type: boolean
//  *                 msg:
//  *                   type: string
//  */

