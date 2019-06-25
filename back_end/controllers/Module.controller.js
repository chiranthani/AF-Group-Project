const Modules = require('../models/modules');

var ModuleController = function(){
   
   //get all modules in db
    this.getAll = () =>{
        return new Promise((resolve,reject)=>{
            Modules.find().then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};

	this.retrieveByID=(id)=>{
			return new Promise ((resolve,reject)=>{
				 console.log(id);
				Modules.find({'moduleCode':{ $in: [id]}}).then((data)=>{
					resolve({status:200,message:data});

				}).catch((err)=>{
					reject({status:500,message:"not found"+err});
				})
			});
		};

};
module.exports = new ModuleController();