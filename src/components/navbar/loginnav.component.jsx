import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import DropDown from '../../utils/dropdown'


export default function Loginnav(){
        return(
                    <div>
                    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
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
                    </nav>
                </div>
        )}
    


