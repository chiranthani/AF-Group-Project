const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }

});

module.exports = mongoose.model('User', userSchema);