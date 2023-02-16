import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';


export default function Loginnav() {
    return (
        <div>
            <Navbar variant="dark" bg="dark">
                <Container>
                    <Navbar.Brand><Link className="navbar-brand" to={'/'}>STL Hospitals</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title="Login" id="navbarScrollingDropdown">
                        <NavDropdown.Item ><Link style={{ textDecoration: 'none',color:'black' }} to={'/doctorlogin'}>Doctor</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link style={{ textDecoration: 'none',color:'black' }} to={'/patientlogin'}>Patient</Link></NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Signup" id="navbarScrollingDropdown">
                        <NavDropdown.Item ><Link style={{ textDecoration: 'none',color:'black' }} to={'/sdoctor'}>Doctor</Link></NavDropdown.Item>
                        <NavDropdown.Item ><Link style={{ textDecoration: 'none',color:'black' }} to={'/spatient'}>Patient</Link></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={'/'}>
                        STL Hospitals
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-brand">
                            <DropDown title="Login" sup="/patientlogin" sin="/doctorlogin"></DropDown>
                            </li>
                            <li className="navbar-brand">
                            <DropDown title="Signup" sup="/spatient" sin="/sdoctor"></DropDown>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </nav> */}
        </div>
    )
}



