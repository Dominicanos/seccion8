const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rollesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}


let Schema = mongoose.Schema;




let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']

    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    img: {
        type: String,
        required: [false]
    }, //no es obligatoria
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rollesValidos

    }, // default:USER_ROLE
    stado: {
        type: Boolean,
        default: true
    }, // boolean
    google: {
        type: Boolean,
        default: false
    } // boolean



});

usuarioSchema.methods.toJSON = function() {
    let user = this;

    let UserObjct = user.toObject();
    delete UserObjct.password;

    return UserObjct;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});
module.exports = mongoose.model('Usuario', usuarioSchema);