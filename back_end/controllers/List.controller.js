
const list = require('../models/list');

var ListController = function(){
	
//filter by student list
/** student do the many modules. 
	eg: {studendID:"IT0001",modules:["SE3030","SE3020","SE3010"],...}
	use $in operator
	$in	 - Match any value in array
**/	
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
		
//old use function
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
  //old use function 
    this.getAll = () =>{
        return new Promise((resolve,reject)=>{
            list.find().then((data)=>{
            resolve({status:200,message:data});
        }).catch((err)=>{
            reject({status:500,message:'not found'+err});

        })
     });
	};

	

};
module.exports = new ListController();