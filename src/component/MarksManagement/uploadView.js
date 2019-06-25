import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';


export default class uploadView extends Component{
	
	constructor(props){
		super(props);
		this.state={
			assignmentCount:[],
			modules: []
		}
	
	}
		componentDidMount(){
      	
		// get module code for select option (select * from subjects)	
				//change url: http://localhost:4000/api/Subject/
        axios.get('http://localhost:4000/api/module/')
		.then((response) => { 
			return this.setState({ modules: response.data });
		})
		.catch(error => {
			console.log(error);
		});
		
			var hideOption = 0;
			if(hideOption === 0){
				$("#field").hide();
			}
			
		//try to get the max assignment number for select option (sort assignmentNo max value)
		axios.get('http://localhost:4000/api/marks/assignmentNo/')
		.then((response) => { 
			
			return this.setState({ assignmentCount: response.data });
			
		})
		.catch(error => {
			console.log(error);
		});
		
		var assignment = document.getElementsByName('assignment[]');
		
		for (var i= 0;i<=this.state.assignmentCount.length; i++){
		//	console.log(assignment[i].value);
		//	console.log('ssss');		
		}		
	
	}

	buttonClick(e){
        e.preventDefault();
       
        axios.get('http://localhost:4000/api/marks/viewMarks/'+this.state.module+'/'+this.state.number)
             .then((res) => {
					$("#btnClick1").hide();
					$("#field").show();
			return this.setState({ Lists: res.data });;
		})
		.catch(error => {
			console.log(error);
			alert(error);
		});     
	   
    }
	

	render(){
	
	const { assignmentCount } = this.state;
    return(
         <div className="row" align="center">
		<div className="col-md-12">
			<form onSubmit={this.buttonClick}>
					<div className="form-group">
						<label className="col-md-2 control-label"><b>Module ID</b></label>
						<div className="col-md-4">
						 <select className="custom-select" id="module" onChange={this.onChangeModule} >
							<option hidden>Pls select </option>
							{this.state.modules.map(el => {
								//change moduleCode to subjectCode
								return <option key={el.id}>		
					
								 {el.moduleCode}
								</option>
							
						   })}
						   </select>
						  </div> 
						
						 <label className="col-md-4 control-label"><b>Assignment No</b></label>
						<div className="col-md-4">
						{assignmentCount.map((value, index) => 
								(<tr key={index}><td><input type='hidden' id='assignment[]'name='assignment[]' value={value.assignmentNo} /></td>
												
								</tr>)
								
							)}
						 <select className="custom-select" id="number" onChange={this.onChangeNumber} >
							<option hidden>Pls select </option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						   </select>
						 </div>  
						</div>
				  
					<div className="form-group">
					<div className="col-md-12">
					<input type='hidden' id='assignmentNo'name='assignmentNo' value={this.state.assignmentCount.assignmentNo} />
												
							<input type="submit" id='btnClick1' value="Find" className="btn btn-primary" />
					</div>
					</div>		
            </form>
			</div>
		</div> 


    );
}

}
   