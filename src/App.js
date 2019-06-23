import React,{Component} from 'react';
import {BrowserRouter as Router, Route,Switch, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

//add the all main function navigation bar Switchs
import Home from "./Home";
import marks from "./component/MarksManagement/marks";

class  App extends Component {
		
	
	render(){
	return (
		<Router>
			<div>
			
			<Switch>
			<Route path="/" exact component={Home}/>
			<Route path="/marks" component={marks} />
			</Switch>
			</div>
		</Router>
	  );
}
}

export default App;

