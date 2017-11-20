import React, {Component} from 'react';
import {Header} from '../../blocks';
import {Grid, Row, Jumbotron, Form, FormGroup, FormControl, Col, Checkbox, Button} from 'react-bootstrap';
import FormValidation from '@adwatch/form';

const validateConfig = {
	$blockForm: '#form-log',
	setErrors: {targetParent: '.form-group', targetError: '.form-msg'},
	filters: true,
	ajaxBody: {
		type: 'method',
		url: 'action',
		data: 'serialize'
	},
	callbackAjaxError: data => {
		console.log(data);
	},
	callbackAjaxSuccess: data => {
		data.status == 'success' ? window.location = '/chat' : null;
	},
	setServerError: (xhr, form) => {
		var errors = xhr.responseJSON.errors;

        if(Object.keys(errors).length){
			for(let key in errors){
				let formGroup = form.$blockForm.find('[name="' + key + '"]').closest(form.setErrors.targetParent);
                formGroup.addClass(form.clsErrorInput);
                formGroup.find(form.setErrors.targetError).text(errors[key].message);
			}
        }
	}
}

export default class Login extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		new FormValidation(validateConfig).init();
	}

	componentDidUpdate(){
		new FormValidation(validateConfig).init();
	}

    static path = '/login'

    render(){
        return(
			<Grid>
				<Row>
					<Col sm={12} md={8} mdOffset={2} lg={6} lgOffset={3}>
						<Jumbotron className="page-login">
			                <h1>Login</h1>
			                <Form action="/login" method="POST" id="form-log">
			                    <FormGroup>
			                        <Col sm={2}>
			                            Email
			                        </Col>
			                        <Col sm={10}>
			                            <FormControl type="test" placeholder="Boris" data-f="oL"  name="username" data-validation="required"/>
										<div className="form-msg"></div>
			                        </Col>
			                    </FormGroup>

			                    <br/>

			                    <FormGroup>
			                        <Col sm={2}>
			                            Password
			                        </Col>
			                        <Col sm={10}>
			                            <FormControl type="password" placeholder="Password" name="password" data-validation="required"/>
										<div className="form-msg"></div>
			                        </Col>
			                    </FormGroup>

			                    <FormGroup>
			                        <Col smOffset={2} sm={10}>
			                            <Checkbox name="remember">Remember me</Checkbox>
										<div className="form-msg"></div>
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
