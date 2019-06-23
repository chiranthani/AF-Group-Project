import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';

export default class upload extends Component{
	
	constructor(props) {
    super(props);
	this.onChangeHandler = this.onChangeHandler.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        selectedFile: null
      }
   
  }
  onChangeHandler(e){
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
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
			<p>Add Notifications</p>
			 </fieldset>
		</div>
		
	);
	}
}