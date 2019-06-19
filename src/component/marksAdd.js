import React, {Component} from 'react';
import axios from 'axios';


export default class marksAdd extends Component{
   
   constructor(props) {
        super(props);
		this.onChangeModule = this.onChangeModule.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
		this.state = {
			module:'',
             Lists:[]
   }
   }
    onChangeModule(e) {
        this.setState({
            module: e.target.value
        });
    }
   
	
	buttonClick(e){
        e.preventDefault();
        console.log(`Form submitted..`);
 
        axios.get('http://localhost:4005/list/'+this.state.module).then((res)=>{
            console.log(res.data)
        });
        this.setState({
            module:''         
        })
    }
	
    render(){
        return(
            <div align="center" >
                <form onSubmit={this.buttonClick}>
                <div className="form-group">
                    <label ckassName="col-md-4 control-label"><b>Module ID</b></label>
                    <div className="col-md-4">
                        <input type="text"
                               className="form-control"
                               id='module'
							   value={this.state.module}
                               onChange={this.onChangeModule}							   
                               />
                    </div>
                </div>
               
                <div className="form-group">
                <div className="col-md-12">
                        <input type="submit" value="Find" className="btn btn-primary" />
                </div>
                </div>
		
                </form>
				<table>
				
			   </table>
            </div>
        );
    }	
}