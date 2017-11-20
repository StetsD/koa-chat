import React, {Component} from 'react';
import {Grid, Row, Col, Jumbotron, Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import FormValidation from '@adwatch/form';

const validateConfig = {
	$blockForm: '#form-reg',
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
		data.status == 'success' ? window.location = '/login' : null;
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

export default class Reg extends Component{
	constructor(props){
		super(props);
	}

	static path = '/registration'

	componentDidUpdate(){
		new FormValidation(validateConfig).init();
	}

	componentDidMount(){
		new FormValidation(validateConfig).init();
	}

	render(){
		return(
			<Grid>
				<Row>
					<Col  md={8} mdOffset={2} lg={6} lgOffset={3} sm={12}>
						<Jumbotron >
							<h2>Registration</h2>

							<Form method="POST" action="/registration" id="form-reg">
								<FormGroup>
									<ControlLabel>Name</ControlLabel>
									<FormControl type="text" placeholder="Boris" name="username" data-validation="required"/>
									<div className="form-msg"></div>
								</FormGroup>

								<FormGroup>
									<ControlLabel>Password</ControlLabel>
									<FormControl type="password" placeholder="Password" name="password" data-validation="password"/>
									<div className="form-msg"></div>
								</FormGroup>

								<FormGroup>
									<ControlLabel>Repeat Password</ControlLabel>
									<FormControl type="password" placeholder="Password" name="password2" data-validation="equal"/>
									<div className="form-msg"></div>
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
