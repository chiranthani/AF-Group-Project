const mongoose = require('mongoose');

let Modules = new mongoose.Schema({
    moduleCode : {
        type: String,
		required:true
    },
    name :{
        type: String,
		required:true
    }
});

module.exports = mongoose.model('Modules',Modules);
