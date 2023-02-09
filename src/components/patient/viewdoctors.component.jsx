import axios from 'axios';
import React from 'react'
import { getalldoctorsurl } from '../../utils/constants';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function Viewdoctors() {

    let alldoctors = []
    axios.get(getalldoctorsurl)
        .then(res => {
            let temp = res.data
            temp = JSON.stringify(temp)
            window.localStorage.setItem("alldoctors", temp)
        })
    alldoctors = JSON.parse(window.localStorage.getItem("alldoctors"))
    
    return (
        <div className='welcome'>
            <h1>
                Our Doctors
            </h1>
            {alldoctors.map(doctor =>
                <Card className='text-center' key={doctor["email"]}>
                    <Card.Body>
                        <Card.Title>Dr. {doctor["firstname"]} {doctor["lastname"]}</Card.Title>
                        <Card.Text>
                            {doctor["feild"]} {doctor["qualification"]}
                            <br></br>
                            {doctor["email"]}
                        </Card.Text>
                        <Link to="/bookappointment2">
                            <Button variant="primary" onClick={() => window.localStorage.setItem("doctoremail", doctor["email"])}>
                                Book Appointment
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}