import React, {Component} from 'react';
import {Header} from '../../blocks';
import {Grid, Row, Jumbotron, Form, FormGroup, FormControl, Col, Checkbox, Button} from 'react-bootstrap';

export default class Login extends Component{
	constructor(props){
		super(props);
	}

    static path = '/login'

    render(){
        return(
			<Grid>
				<Row>
					<Col sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
						<Jumbotron className="page-login">
			                <h1>Login</h1>
			                <Form>
			                    <FormGroup>
			                        <Col sm={2}>
			                            Email
			                        </Col>
			                        <Col sm={10}>
			                            <FormControl type="email" placeholder="Email"/>
			                        </Col>
			                    </FormGroup>

			                    <br/>

			                    <FormGroup>
			                        <Col sm={2}>
			                            Password
			                        </Col>
			                        <Col sm={10}>
			                            <FormControl type="password" placeholder="Password"/>
			                        </Col>
			                    </FormGroup>

			                    <FormGroup>
			                        <Col smOffset={2} sm={10}>
			                            <Checkbox>Remember me</Checkbox>
			                        </Col>
			                    </FormGroup>

			                    <FormGroup>
			                        <Col>
			                            <Button type="submit">Sign in</Button>
			                        </Col>
			                    </FormGroup>
			                </Form>
			            </Jumbotron>
					</Col>
				</Row>
			</Grid>
        )
    }
}
