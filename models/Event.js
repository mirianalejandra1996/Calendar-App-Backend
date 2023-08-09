const { Schema, model } = require("mongoose");

const EventSchema = Schema({
    
    title: {
        type: String,
        require: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, // Let mongoose know this is a reference
        ref: 'User', // The other schema Name
        required: true,
    }
})

// Con esto podemos modificar nuestro documento antes de entrar a la BD,
// como quitar X propiedades o sobreescribirlas (remover "__v" y reemplazar "_id" por "id")
EventSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Event', EventSchema)