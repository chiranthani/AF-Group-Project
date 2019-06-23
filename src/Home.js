import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


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
	  	
		 <nav className="navbar">
			
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
	  </div>
    );
  }
}


