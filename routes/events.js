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

// All request have to pass to JWT validator
// If I move this line below getEvents, then only getEvents will be public (no need JWT Validator) 
router.use(validateJWT)


// router.get('/', validateJWT, getEvents)
router.get('/', getEvents)

// router.post('/', validateJWT, createEvent)
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    // check('start', 'Start Date is required').not().isEmpty(),
    check('start', 'Start Date is required').custom(isDate),
    check('end', 'End Date is required').custom(isDate),
    fieldsValidator
],
createEvent)

// router.put('/:id', validateJWT, updateEvent)
router.put('/:id', updateEvent)

// router.delete('/:id', validateJWT, deleteEvent)
router.delete('/:id', deleteEvent)

module.exports = router;