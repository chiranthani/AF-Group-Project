const mongoose = require('mongoose');

let marksNotifyMsg = new mongoose.Schema({  
	
			fileName :{
				type: String
			},
			message : {
				type: String		
			},
			date :{
				type: Date,
				default : Date.now
			}
			
				
	
});

module.exports = mongoose.model('marksNotifyMsg',marksNotifyMsg);