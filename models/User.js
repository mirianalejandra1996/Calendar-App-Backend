const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
})

// Verificar si toJSON ya existe en el esquema y luego extenderlo
// if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
// UserSchema.options.toObject.transform = function (_, ret,) {
//     ret.uid = ret._id;
//     delete ret._id;
//     delete ret.__v;
//     return ret;
// };


module.exports = model('User', UserSchema)