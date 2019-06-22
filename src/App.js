import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

import Home from "./Home";

class  App extends Component {
		
	
	render(){
	return (
		<Router>
			<div className="container">
			
			<nav className="navbar">
				<div className="collpase">
					<ul className="navbar nav mr-auto">
						<li className="navbar-item">
						<Link to="/" className="nav-link">Home</Link>
						</li>
						
					</ul>
				</div>
			</nav>
			<Route path="/" exact component={Home}/>

			</div>
		</Router>
	  );
}
}

export default App;

