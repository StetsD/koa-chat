import React, {Component} from 'react';
import {Grid, Row, Col, Jumbotron, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './style.scss';

export default class Chat extends Component{
	constructor(props){
		super(props);
	}

	static path = '/chat'

	render(){
		return(
			<Grid>
				<Row>
					<Col sm={12} md={10} mdOffset={1} lg={12} lgOffset={0}>
						<Jumbotron>
							<h3>Chat Koa-e</h3>
							<div className="chat-wrapper">
								<ul className="chat-user-list">
									<li>Boris</li>
									<li>Britva</li>
								</ul>
								<div className="chat-window">
									<div className="chat-msg-item">
										<p><strong>Boris</strong> : 09:12:03</p>
										<p>Test test test lklklklk</p>
									</div>
								</div>
							</div>

							<div>

								<ControlLabel>Message</ControlLabel>
								<FormControl componentClass="textarea"/>
							</div>

						</Jumbotron>
					</Col>
				</Row>
			</Grid>
		)
	}
}
