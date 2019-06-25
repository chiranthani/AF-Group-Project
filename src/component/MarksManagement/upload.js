import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

export default class upload extends Component{
	
	constructor(props) {
    super(props);
	this.onChangeHandler = this.onChangeHandler.bind(this);
	this.onChangeMessage = this.onChangeMessage.bind(this);
	this.onChangeFileName = this.onChangeFileName.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	this.buttonClick = this.buttonClick.bind(this);
	
      this.state = {
        selectedFile: null,
		message:'',
		fileName:''
      }
   
  }
  onChangeHandler(e){
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  }
  onChangeMessage(e){
	  this.setState({
      message: e.target.value
     
    })
  }
  onChangeFileName(e){
	  this.setState({
      fileName: e.target.value
     
    })
  }
  componentDidMount(){
	  $("#field").hide();
  }
	onSubmit(e){
        e.preventDefault();
        console.log(`Form submitted..`);
		const data = new FormData();
		 data.append('file', this.state.selectedFile);
		 console.log(data);
		 
		axios.post("http://localhost:4000/api/marks/upload",data).then((res)=>{
			
			alert("Uploaded Successfully..!");
			$("#field").show();
            console.log(res.data);
        }).catch(error => {
			console.log(error);
		});
		
	}
	
	buttonClick(e){
		 e.preventDefault();
		 var notifyMessage =({
			 "fileName": this.state.fileName,
			 "message" : this.state.message
			 
		 })
		 axios.post("http://localhost:4000/api/marks/notifyAdd",notifyMessage).then((res)=>{
            console.log(res.data);
			$("#btnClick1").show();
			$("#field").hide();
			
			this.setState({
				fileName:'',
				message:'',
				selectedFile: null
			});
			
			alert("Notify message added Successfully..!");
        }).catch(error => {
			console.log(error);
		});
	}
	render(){
	return(
		<div align="center" >
                <form onSubmit={this.onSubmit} enctype="multipart/form-data" >
					<h4>Upload Mark sheets</h4>
					<div className="input-group mb-3">
					  <div className="input-group-prepend">
						<span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
					  </div>
					  <div className="custom-file">
					<label className="custom-file-label" for="fileInput">
						<input type="file" 
							   className="custom-file-input" 
							   id="fileInput" 
							   onChange={this.onChangeHandler}
							   name="file"/>
						</label>
					  </div>
					</div>
							
					  
					<button type="submit" className="btn btn-primary">Submit</button>
			</form>
			
			<fieldset id='field' >
			<br></br>
			<div><h3><b>Add Notifications Message</b></h3></div>
			
			<form onSubmit={this.buttonClick}>
				<div className="form-group">
						<label className="col-md-2 control-label">Enter File Name</label>
						<div className="col-md-4">
						 <input type="text" 
							   className="form-control" 
							   id="fileName" 
							   onChange={this.onChangeFileName}
							   name="fileName"/>
						  </div> 
						  </div>
						  <div className="form-group">
						<label className="col-md-2 control-label">Enter Message</label>
						<div className="col-md-4">
						 <input type="text" 
							   className="form-control" 
							   id="message" 
							   onChange={this.onChangeMessage}
							   name="message"/>
						  </div> 
						  </div>
						  
				<button type="submit" className="btn btn-primary">Add Notify Message</button>
			</form>
			 </fieldset>
		</div>
		
	);
	}
}