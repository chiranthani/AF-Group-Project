 import React, {Component} from 'react';
import axios from 'axios';

const Game = props =>(

 <tr>
		<td>{props.book.id}</td>
		<td>{props.book.fileName}</td>
		</tr>
  
)

/*const fakeRequest = () =>
  new Promise(resolve => setTimeout(() => resolve(Games), 1000));
  */
export default class uploadView extends Component{
	
	constructor(props){
		super(props);
		this.state={
			Games: []
		}
	
	}
	componentWillMount(){
		axios.get('http://localhost:4005/uploadView')
		.then((res)=>{
				this.setState({Games:res.data});
		})
		
	}
	

	/*bookList(){
		return this.state.Games.map((book,i)=>{
			return <Game book={book} key={i}/>
		})
	}   */
	/*getEmployees = () =>
    fakeRequest()
      .then(Games => this.setState({ Games }))
*/
	render(){
	/* const employees = this.state.Games.map(employee => (
      <div style={{ border: "1px solid black" }} key={employee._id}>
        <h3>Name: {employee.name}</h3>
        <p>Contact: {employee.contact}</p>
        <p>{employee.age}</p>
      </div>
    ));*/
    return(
        <div><br></br>
			   <h3>Book List</h3><br></br>
			     <div class="row">
       
    </div>
				
			 {this.bookList()}
			</div>



    );
}

}
   