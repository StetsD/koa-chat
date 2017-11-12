import React, {Component} from 'react';
import {Grid, Row, Col, Jumbotron, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

export default class Reg extends Component{
	constructor(props){
		super(props);
	}

	static path = '/registration'

	render(){
		return(
			<Grid>
				<Row>
					<Col  md={8} mdOffset={2} lg={6} lgOffset={3} sm={12}>
						<Jumbotron>
							<h2>Registration</h2>

							<Form>
								<FormGroup>
									<ControlLabel>Name</ControlLabel>
									<FormControl type="text" placeholder="Boris" name="username"/>
								</FormGroup>

								<FormGroup>
									<ControlLabel>Password</ControlLabel>
									<FormControl type="password" placeholder="Password" name="password"/>
								</FormGroup>

								<FormGroup>
									<ControlLabel>Repeat Password</ControlLabel>
									<FormControl type="password" placeholder="Password" name="password2"/>
								</FormGroup>

								<FormGroup>
									<Button type="submit">Submit</Button>
								</FormGroup>
							</Form>
						</Jumbotron>
					</Col>
				</Row>
			</Grid>

		)
	}
}
