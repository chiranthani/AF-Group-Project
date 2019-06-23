const mongoose = require("mongoose");

var markSheetUpload = new mongoose.Schema({
   
    fileName: String,
	date : String

});

module.exports = mongoose.model("markSheetUpload", markSheetUpload);
