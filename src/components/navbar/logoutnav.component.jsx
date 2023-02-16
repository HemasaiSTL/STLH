// eslint-disable-next-line 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

export default function Logoutnav() {
    let text = window.localStorage.getItem("name")
    const name = text.split("@")[0]
    function doctorprofile(e) {
        e.preventDefault()
        window.location.href = "/doctorprofile"
    }
    function patientprofile(e) {
        e.preventDefault()
        window.location.href = "/patientprofile"
    }

    function logout(e) {
        window.localStorage.removeItem("jwt")
        window.localStorage.removeItem("type")
        window.location.href = "/"
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><Link className="navbar-brand" to={'/'}>Hi, {name.toUpperCase()}</Link></Navbar.Brand>
                    <Nav className="me-auto">
                        {window.localStorage.type === "Doctor" ?
                            <Nav.Link onClick={(e) => { doctorprofile(e) }}>Profile</Nav.Link>
                            :
                            <Nav.Link onClick={(e) => { patientprofile(e) }}>Profile</Nav.Link>
                        }
                        {window.localStorage.type === "Doctor" ?
                            <NavDropdown title="Appointments">
                                <NavDropdown.Item>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/viewappointments">My Appointments</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/myschedule">My Schedule</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            :
                            <NavDropdown title="Booking">
                                <NavDropdown.Item>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/mybookings">
                                        My Appointments
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to="/bookappointment1">
                                        Book Appointmnet
                                    </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Nav.Link onClick={(e) => logout(e)}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>


            {/* <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        Hi, {name}
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="navbar-brand">
                                {window.localStorage.type === "Doctor" ?
                                    <Button variant="primary" onClick={(e) => {doctorprofile(e)}}>Profile</Button>
                                    :
                                    
                                    <Button variant="primary" onClick={(e) => {patientprofile(e)}}>Profile</Button>
                                }

                            </li>
                            <li className="navbar-brand">
                                {window.localStorage.type === "Doctor" ?
                                    <NavDropdown title="Appointments">
                                        <NavDropdown.Item>
                                            <Link to="/viewappointments">
                                                My Appointments
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to="/myschedule">
                                                My Schedule
                                            </Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <NavDropdown title="Booking">
                                        <NavDropdown.Item>
                                            <Link to="/mybookings">
                                                My Appointments
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to="/bookappointment1">
                                                Book Appointmnet
                                            </Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                }
                            </li>
                            <li className="navbar-brand">
                                <Button variant="primary" onClick={(e) => logout(e)}>Logout</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
        </div>

    )
}