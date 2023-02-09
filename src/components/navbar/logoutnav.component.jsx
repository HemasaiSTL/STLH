// eslint-disable-next-line 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function Logoutnav() {
    let text = window.localStorage.getItem("name")
    const name = text.split("@")[0]
    function doctorprofile(e){
        e.preventDefault()
        window.location.href = "/doctorprofile"
    }
    function patientprofile(e){
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
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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
                                    <DropdownButton id="dropdown-basic-button" title="Appointments">
                                        <Dropdown.Item>
                                            <Link className="nav-link" to="/viewappointments">
                                                My Appointments
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link className="nav-link" to="/myschedule">
                                                My Schedule
                                            </Link>
                                        </Dropdown.Item>
                                    </DropdownButton>
                                    :
                                    <DropdownButton id="dropdown-basic-button" title="Booking">
                                        <Dropdown.Item>
                                            <Link className="nav-link" to="/mybookings">
                                                My Appointments
                                            </Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Link className="nav-link" to="/bookappointment1">
                                                Book Appointmnet
                                            </Link>
                                        </Dropdown.Item>
                                    </DropdownButton>
                                }
                            </li>
                            <li className="navbar-brand">
                                <Button variant="primary" onClick={(e) => logout(e)}>Logout</Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}