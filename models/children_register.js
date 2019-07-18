const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const children_register = new Schema({
    id_family: String,
    name: String,
    last_name: String,
    age: String,
    curp: String,
    gender: String,
    brothers: Boolean,
    location: String,
    scholarship: String,
    legal_status: String,
    lives_with: String,
    receive_assistance: {
        assitance: Boolean,
        type_assistance:{
            social: Boolean,
            medical: Boolean,
            legal: Boolean
        }
    }
})

const Children_register = mongoose.model('Children_register', children_register)
module.exports = {Children_register}