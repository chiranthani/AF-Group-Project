
const list = require('../models/list');

var ListController = function(){

	this.Insert = () => {
		return new Promise((resolve, reject)=>{
			list.save()
			.then((data)=>{
				resolve({status:200,message:data});
			}).catch((err)=>{
				reject({status:500,message:'not found'+err});
			})
		});
	};
   
    this.getAll = () =>{
        return new Promise((resolve,reject)=>{
            list.find().then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};

	this.retrieveByID=(id)=>{
			return new Promise ((resolve,reject)=>{
				 console.log(id);
				list.find({'modules':{ $in: [id]}}).then((data)=>{
					resolve({status:200,message:data});

				}).catch((err)=>{
					reject({status:500,message:"not found"+err});
				})
			});
		};

};
module.exports = new ListController();