
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { getappointments } from '../../utils/constants';

export default function Viewappointments() {
    var [appointments, setAppointments] = useState([])
    useEffect(() => {
        axios.get(getappointments + (window.localStorage.getItem("name")))
            .then((res) => {
                setAppointments(res.data);
            });
    }, []);
    console.log(appointments)

    return (
        <>
        <div class="text-center bg-dark" >
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">My Appointments</h1>
                </div>
        </div>
        <div className="auth-wrapper">
            <div className="auth-inner-va">
                <form>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>AppointmentID</th>
                                <th>Patient Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Contact</th>
                                <th>Date</th>
                                <th>Slot</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((temp) =>
                                <tr>
                                    <td>{temp.split(",")[0]}</td>
                                    <td>{temp.split(",")[2]}</td>
                                    <td>{temp.split(",")[3]}</td>
                                    <td>{temp.split(",")[4]}</td>
                                    <td>{temp.split(",")[5]}</td>
                                    <td>{temp.split(",")[7]}</td>
                                    <td>{temp.split(",")[8]}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </form>
            </div>
        </div>
        </>
    )
}

