const mongoose = require('mongoose');

const list = new mongoose.Schema({
    studentID:{
        type:String,
        required:true
    }
});

mongoose.model('list',list);

mongoose.connect('mongodb://127.0.0.1:27017/SLIIT', {useNewUrlParser : true}). then(()=>{
    console.log('connected to DB');
}).catch ((err)=>{
    console.log(err);
});


module.exports = mongoose;