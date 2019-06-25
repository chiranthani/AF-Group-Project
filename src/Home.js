import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import home from "./images/1.jpg";

export default class Home extends Component {
  
  /**below li remove after add access permissions
  			
			<li className="navbar-item">
			<Link to="/" className="nav-link">Assignments</Link>
			</li>
			<li className="navbar-item">
			<Link to="/marks" className="nav-link">Assignment Results</Link>
			</li>
  **/
  render() {
    return (
      <div>
	  	
		 <nav className="navbar" align="center">
			
					<ul className="navbar nav mr-auto">
						<li className="navbar-item">
						<Link to="/" className="nav-link">Home</Link>
						</li>
						<li className="navbar-item">
						<Link to="/" className="nav-link">Sign Up</Link>
						</li>
						<li className="navbar-item">
						<Link to="/" className="nav-link">Login</Link>
						</li>
						
						<li className="navbar-item">
						<Link to="/" className="nav-link">View Courses & subjects</Link>
						</li>
						<li className="navbar-item">
						<Link to="/" className="nav-link">Assignments</Link>
						</li>
						<li className="navbar-item">
						<Link to="/marks" className="nav-link">Assignment Results</Link>
						</li>
						
					</ul>
				
			</nav>
			<div align="center"><img src={home} width="780" height="540" /></div>
	  </div>
    );
  }
}


