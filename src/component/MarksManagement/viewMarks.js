import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import { saveAs } from 'file-saver';

class viewMarks extends Component{
	
	constructor(props) {
        super(props);
		this.onChangeModule = this.onChangeModule.bind(this);
		this.onChangeNumber = this.onChangeNumber.bind(this);
		this.onChangeUpdatedMark = this.onChangeUpdatedMark.bind(this);
		this.onChangeAssignmentNo = this.onChangeAssignmentNo.bind(this);
		this.createAndDownloadPdf = this.createAndDownloadPdf.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
			this.state = {			
				assingmentNo:'',
				module:'',
				number:'',
				updatedMark:0,
				Lists:[],
				modules : [],
				assignmentCount:[]
				
				
		}
   }
   
    onChangeModule(e) {
        this.setState({
            module: e.target.value
        });
    }
	onChangeAssignmentNo(e){
		this.setState({
            assignmentNo: e.target.value
        });
	}
	onChangeNumber(e){
		this.setState({
            number: e.target.value
        });
	}
	onChangeUpdatedMark(e){
		this.setState({
            updatedMark: e.target.value
        });
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
	
	 // filter option (select * from marks where moduleID=? AND assignmentNo=?)
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
	
	// update form 
	onSubmit(e){
        e.preventDefault();
        console.log(`Form submitted..`);
		
			var objID = document.getElementsByName('objID[]');
			var studentID = document.getElementsByName('studentID[]');
			var mark = document.getElementsByName('mark[]');
			var updatedMark = document.getElementsByName('updatedMark[]');
			
			var marks = [];
			
			for (var i= 0;i< this.state.Lists.length; i++){
				
				//if the update field not change: add old value in the updated marks field
				var update = parseFloat(updatedMark[i].value);
				if(update === 0.0){
					var updateValue = parseFloat(mark[i].value);
					
				}else{
					updateValue = update;
				}
				
				var markset ={
					"_id":objID[i].value,
					"studentID":studentID[i].value,
					"moduleID": this.state.module,
					"assignmentNo": parseInt(this.state.number),
					"mark": updateValue,				
			}
				//create marks array for update
				marks.push(markset);		
		}
		
		console.log(marks);
            
        axios.put("http://localhost:4000/api/marks/update",marks).then((res)=>{
            console.log(res.data);
			
			this.setState({
				number:'',
				module:'',
				updatedMark:''
		})
				
		$("#btnClick1").show();
		$("#field").hide();
		
			alert("Updated Successfully..!");
        }).catch(error => {
			console.log(error);
			alert(error);
		});				
	}
	
	createAndDownloadPdf(e){
		e.preventDefault();
		var student =[];
		var marks =[];
				
			var studentID = document.getElementsByName('studentID[]');
			var mark = document.getElementsByName('mark[]');
		
			for (var i= 0;i< this.state.Lists.length; i++){
				
				var m = parseFloat(mark[i].value);					
				var s = studentID[i].value;
			
				marks.push(m);
				student.push(s);
			}						
		
		console.log(student,marks);
		axios.post('http://localhost:4000/api/marks/create-pdf', student)
		.then(() => axios.get('http://localhost:4000/fetch-pdf', { responseType: 'blob' }))
			.then((res) => { 
					const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
					saveAs(pdfBlob, 'generatedDocument.pdf');
			});
	}
	
render(){
	const { assignmentCount } = this.state;
	const { Lists } = this.state;
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
			<fieldset id='field' >
		
					<form onSubmit={this.onSubmit}>
					<table>
							<th></th>
							 <th>StudentID</th>
							 
							 <th>Marks </th>
							<th>Update (if only needed) </th>
						
							{Lists.map((value, index) => 
								(<tr key={index}><td><input type='hidden' name='objID[]' value={value._id} /></td>
												<td><input type='text' name='studentID[]' value={value.studentID} /></td>						
												<td><input type='text' name="mark[]" value={value.mark} /></td>
												<td><input type='text' id="updatedMark[]" name="updatedMark[]" defaultValue ='0' onChange={this.onChangeUpdatedMark}/></td>
								</tr>)
								
							)}
					
					</table>
						
						<br></br>
						<div className="form-group">
							<div className="col-md-12">
								<input type="submit" id='btnClick2' value="Update" className="btn btn-primary" />
					
							</div>
						</div>
			
						 </form>
			
							<form onSubmit={this.createAndDownloadPdf}>
							<div>This Marks List is Final. Generate PDF</div>
								{Lists.map((value, index) => 
								(<tr key={index}><td><input type='hidden' name='studentID[]' value={value.studentID} /></td>						
												<td><input type='hidden' name="mark[]" value={value.mark} /></td>
												
								</tr>)
								
							)}
							<input type="submit" id='btnClick3' value="Completed Mark Sheet PDF Generate" className="btn btn-primary" />
					
							</form>
						 </fieldset>
		</div>
	</div>

    );
}

}

export default viewMarks;