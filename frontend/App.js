import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Header} from './components/blocks';
import {connect} from 'react-redux';


class App extends Component {
	constructor(props){
		super(props);
	}

	static path = '/'

	render(){
		return(
			<div>
				<Header/>
				{this.props.children}
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		...state
	};
}

export default connect(mapStateToProps)(App)
