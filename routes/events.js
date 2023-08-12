/*
    Events Route
    /api/events
*/

const { Router } = require('express')
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validateJWT } = require("../middlewares/jwt-validator");
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { isDate } = require('../helpers/isDate');


const router = Router()

// * All request have to pass to JWT validator
// If I move this line below getEvents, then only getEvents will be public (no need JWT Validator) 
router.use(validateJWT)


/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get a list of events
 *     tags: [Event]
 *     security:
 *       - x-token: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *             example:
 *               ok: true
 *               events:
 *                 - title: Ir al médico
 *                   notes: Llevar mascarilla y documento de identidad
 *                   start: '2023-03-09T21:37:00.000Z'
 *                   end: '2023-03-09T22:37:00.000Z'
 *                   user:
 *                     _id: '64d689cf...'
 *                     name: John Doe
 *                   id: '64d40731566daafba3ded200'
 *                 - title: Preparar mochilas hijos
 *                   notes: Paseo escolar al museo
 *                   start: '2023-03-11T11:30:00.000Z'
 *                   end: '2023-03-11T13:30:00.000Z'
 *                   user:
 *                     _id: '64d3c435...'
 *                     name: Antonella
 *                   id: '64d407ce566daafba3ded202'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Invalid token
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               ok: false
 *               msg: Error getting all events
 */

/**
 * @swagger
 * /events:
 *   post:
 *     tags: [Event]
 *     summary: Create a new event
 *     description: Creates a new event with the provided data
 *     operationId: createEvent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the event
 *                 example: Ir al médico
 *               notes:
 *                 type: string
 *                 description: Additional notes for the event
 *                 example: Llevar mascarilla y documento de identidad
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: Start date and time of the event
 *                 example: 2023-03-09T21:37:00.000Z
 *               end:
 *                 type: string
 *                 format: date-time
 *                 description: End date and time of the event
 *                 example: 2023-03-09T22:37:00.000Z
 *     responses:
 *       '200':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               event:
 *                 title: Ir al médico
 *                 notes: Llevar mascarilla y documento de identidad
 *                 start: '2023-03-09T21:37:00.000Z'
 *                 end: '2023-03-09T22:37:00.000Z'
 *                 user: '64d3b059d497df9dd553b932'
 *                 id: '64d6b1a2886b1288a5c54177'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Please contact with the admin
 *     security:
 *       - x-token: []
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     tags:
 *       - Event
 *     summary: Update an event
 *     description: Update an existing event by its ID
 *     operationId: updateEvent
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the event to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: New title of the event
 *                 example: Entrevista
 *               notes:
 *                 type: string
 *                 description: New additional notes for the event
 *                 example: Preparar recursos para la presentación
 *               start:
 *                 type: string
 *                 format: date-time
 *                 description: New start date and time of the event
 *                 example: 2023-08-15T15:00:00.000Z
 *               end:
 *                 type: string
 *                 format: date-time
 *                 description: New end date and time of the event
 *                 example: 2023-08-15T17:00:00.000Z
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               event:
 *                 title: Entrevista
 *                 notes: Preparar recursos para la presentación
 *                 start: '2023-08-15T15:00:00.000Z'
 *                 end: '2023-08-15T17:00:00.000Z'
 *                 user: '64d3b059d497df9dd553b932'
 *                 id: '64d6b1a2886b1288a5c54177'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Please contact with the admin
 *     security:
 *       - x-token: []
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     tags:
 *       - Event
 *     summary: Delete an event
 *     description: Delete an existing event by its ID
 *     operationId: deleteEvent
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the event to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Please contact with the admin
 *     security:
 *       - x-token: []
 */

// * Obtain events

// router.get('/', validateJWT, getEvents)
router.get('/', getEvents)

// * Create a new event

// router.post('/', validateJWT, createEvent)
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    // check('start', 'Start Date is required').not().isEmpty(),
    check('start', 'Start Date is required').custom(isDate),
    check('end', 'End Date is required').custom(isDate),
    fieldsValidator
],
createEvent)

// * Update an Event
// router.put('/:id', validateJWT, updateEvent)
router.put('/:id', updateEvent)

// * Remove an Event
// router.delete('/:id', validateJWT, deleteEvent)
router.delete('/:id', deleteEvent)

module.exports = router;