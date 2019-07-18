const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const woman_register = new Schema({
    id_family: String,
    name: String,
    last_name: String,
    age: String,
    curp: String,
    location: String,
    last_occupation: String,
    num_of_children: String,
    civil_state: String,
    date_decease: String,
    legal_status: String,
    research_folder: String,
    img: String
})

const Woman_register = mongoose.model('Woman_register', woman_register)

module.exports = {Woman_register}