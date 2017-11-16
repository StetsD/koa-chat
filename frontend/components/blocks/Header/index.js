import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
						<Link to="/">Koa-e</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li role="presentation" className="">
                            <Link to="/login">Login</Link>
                        </li>
                        <li role="presentation" className="">
                            <Link to="/registration">Registration</Link>
                        </li>
                        <li role="presentation" className="">
                            <Link to="/chat">Chat</Link>
                        </li>
                    </ul>
                </div>
            </Navbar>
        )
    }
}
