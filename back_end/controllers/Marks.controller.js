const Marks = require('../models/marks');

var MarksController = function(){
   
    this.getAll = () =>{
        return new Promise((resolve,reject)=>{
            Marks.find().then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};
	
	//sort the max assignmentNo value
	this.findAssignmentNo = ()=>{
		return new Promise((resolve,reject)=>{
            Marks.find().sort({'assignmentNo': -1}).limit(1).then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};
	
	// find student marks list(select * from marks where moduleID=? AND assignmentNo=?)
	
	this.findForViewMarks = (moduleID,assignmentNo) =>{
		return new Promise ((resolve,reject)=>{
			console.log(moduleID,assignmentNo); // testing purpose
			Marks.find({"$and":[{"moduleID": moduleID , "assignmentNo":assignmentNo}]}).then((data)=>{
				 resolve({status:200,message:data});
			}).catch((err) =>{
				reject({status:500,message:'not found'+err});
			})
			
		});
		
	};
	
	// insert marks array of object
	this.addData = (data) =>{
        return new Promise((resolve,reject)=>{          
			 console.log(data); // display array of object
            //try the insertMany function but isn't working. (my mongodb version (3.0))
			db.marks.save(data).then(()=>{
                resolve({status:200, message:"successfully added"});
            }).catch((err)=>{
                reject({status:200,message:"failed"+err});
            });

        });
    };
	
	// update marks array of object
	this.update = (data)=>{
        return new Promise((resolve,reject)=>{
			console.log(data)
            marks.update([{$set:{data}}]).then(()=>{
                resolve({status:200,message:'Marks updated successfully'});
            }).catch((err)=>{
                reject({status:500,message:'Updating failed due to Error: '+err});
            });
        })
    };
	
	this.retrieveByID=(id)=>{
			return new Promise ((resolve,reject)=>{
				 console.log(id);
				Marks.find({'studentID':{ $in: [id]}}).then((data)=>{
					resolve({status:200,message:data});

				}).catch((err)=>{
					reject({status:500,message:"not found"+err});
				})
			});
		};

};
module.exports = new MarksController();