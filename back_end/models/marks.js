const mongoose = require('mongoose');

let Marks = new mongoose.Schema({  
	
	
			studentID : {
				type: String		
			},
			moduleID :{
				type: String	
			},
			assignmentNo:{
				type: Number
			},
			mark:{
				type: Number	
			},
			updatedMark:{
				type:Number
			}
		
	
});

module.exports = mongoose.model('marks',Marks);