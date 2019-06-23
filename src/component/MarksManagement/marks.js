import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import viewMarks from "./viewMarks";
import marksAdd from "./marksAdd";
import upload from "./upload";
import uploadView from "./uploadView";
import studentResultView from "./studentResultView"; 

//marks management navbar routers
class marks extends Component {
  render() {
    return (
     <Router>
			<div className="container">
			
			<nav className="navbar">
				<div className="collpase">
					<ul className="navbar nav mr-auto">
						<li className="navbar-item">
						<Link to="/viewMarks" className="nav-link">View/update Marks</Link>
						</li>
						<li className="navbar-item">
						<Link to="/marksAdd" className="nav-link">Add Marks</Link>
						</li>
						<li className="navbar-item">
						<Link to="/upload" className="nav-link">Upload Marks Sheet</Link>
						</li>
						<li className="navbar-item">
						<Link to="/uploadView" className="nav-link">view file</Link>
						</li>
						<li className="navbar-item">
						<Link to="/studentResultView" className="nav-link">Student Result View</Link>
						</li>
						
					</ul>
				</div>
			</nav>
			<Route path="/viewMarks"  component={viewMarks}/>
			<Route path="/marksAdd"  component={marksAdd}/>
			<Route path="/upload"  component={upload}/>
			<Route path="/uploadView"  component={uploadView}/>
			<Route path="/studentResultView"  component={studentResultView}/>
			
			</div>
		</Router>
    );
  }
}

export default marks;
