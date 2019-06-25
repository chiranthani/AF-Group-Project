const mongoose = require("mongoose");

var markSheetUpload = new mongoose.Schema({
  fileName : {
        type: String,
		required:true
    },
    date :{
        type: Date,
		default : Date.now,
		required:true
    } 
   

});

module.exports = mongoose.model("markSheetUpload", markSheetUpload);
