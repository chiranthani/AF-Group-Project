import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

class marksAdd extends Component{
   
   constructor(props) {
        super(props);
		this.onChangeModule = this.onChangeModule.bind(this);
		this.onChangeAssignmentNo = this.onChangeAssignmentNo.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
			this.state = {			
				assingmentNo:'',
				module:'',
				Lists:[],
				modules : []
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

        
    
	componentDidMount(){
      		// get module code for select option (select * from modules)
							//change url: http://localhost:4000/api/Subject/
        axios.get('http://localhost:4000/api/module/')
		.then((response) => { 
			return this.setState({ modules: response.data });;
		})
		.catch(error => {
			console.log(error);
		});
		var hideOption = 0;
		if(hideOption === 0){
			$("#field").hide();
	}
	} 
	
	
   	// filter students (select * from student where moduleID=?)
	buttonClick(e){
        e.preventDefault();
				//change url : **** check student register subjects*****
        axios.get('http://localhost:4000/api/list/'+this.state.module)
             .then((res) => {
					
			return this.setState({ Lists: res.data });
		})
		.catch(error => {
			console.log(error);
			alert(error);
		});
			$("#btnClick1").hide();
			$("#field").show();
    }
	
	//insert marks for students
	
	onSubmit(e){
        e.preventDefault();
        console.log(`Form submitted..`);
		
			var studentID = document.getElementsByName('studentID[]');
			var assignmentNo = document.getElementsByName('assignmentNo[]');
			var mark = document.getElementsByName('mark[]');
			var marks = [];
			
			for (var i= 0;i< this.state.Lists.length; i++){
			
			var markset = ({
					"studentID":studentID[i].value,
					"moduleID": this.state.module,
					"assignmentNo": parseInt(assignmentNo[i].value),
					"mark": parseFloat(mark[i].value)
				
			})
			
			
				marks.push(markset);		
		}
		
		
            
       axios.post("http://localhost:4000/api/marks",marks).then((res)=>{
            console.log(res.data);
			$("#btnClick1").show();
			$("#field").hide();
			
			this.setState({
				assingmentNo:'',
				module:''
			});
			
			alert("Added Successfully..!");
        }).catch(error => {
			console.log(error);
		});
		
	}
		
    render(){
		const { Lists } = this.state;
        return(
            <div align="center" >
                <form onSubmit={this.buttonClick}>
                <div className="form-group">
                    <label ckassName="col-md-4 control-label"><b>Module ID</b></label>
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
                </div>
               
                <div className="form-group">
                <div className="col-md-12">
                        <input type="submit" id='btnClick1' value="Find" className="btn btn-primary" />
                </div>
                </div>
		
                </form>
				<fieldset id='field' >
		
					<form onSubmit={this.onSubmit}>
					<table>
							 <th>StudentID</th>
							 <th align='center'>Assingment No</th>
							 <th> Marks </th>						
						
							{Lists.map((value, index) => 
								(<tr key={index}><td><input type='text' name='studentID[]' value={value.studentID} /></td>
												<td><input type='text' name="assignmentNo[]" value={this.state.assignmentNo} onChange={this.onChangeAssignmentNo} /></td>
												<td><input type='text' name="mark[]" /></td>
								</tr>)
								
							)}
					
					</table>
						
						<br></br>
						<div className="form-group">
						<div className="col-md-12">
								<input type="submit" id='btnClick2' value="Add" className="btn btn-primary" />
						</div>
						</div>
			
						 </form>  
						 </fieldset>
									    
            </div>
        );
    }	
}
export default marksAdd;