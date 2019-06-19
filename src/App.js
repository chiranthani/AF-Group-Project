import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import logo from './logo.png';
import './App.css';

import marksAdd from "./component/marksAdd";
import uploadView from "./component/uploadView" 

class  App extends Component {
	render(){
	return (
		<Router>
			<div className="container">
			<nav className="navbar">
				<div className="collpase">
					<ul className="navbar nav mr-auto">
						
						<li className="navbar-item">
						<Link to="/marksAdd" className="nav-link">Add Marks</Link>
						</li>
						<li className="navbar-item">
						<Link to="/uploadView" className="nav-link">view file</Link>
						</li>
					</ul>
				</div>
			</nav>
			
			<Route path="/marksAdd"  component={marksAdd}/>
			<Route path="/uploadView"  component={uploadView}/>
			</div>
		</Router>
	  );
}
}

export default App;

