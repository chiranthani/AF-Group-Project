const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:6
    },
    ID_number: {
        type: String,
        required: true,
        min:6
    },
    login_credentials: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }

});

module.exports = mongoose.model('Student', studentSchema);