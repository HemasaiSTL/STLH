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
            <div class="text-center bg-dark" >
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Book your Appointmnet<br></br> & <br />Get the best treatment here</h1>
                    </div>
            </div>
            <div className='bg-grey cards'>
            {alldoctors.map(doctor =>
            <>
                <Card key={doctor["email"]}>
                    <div className='crd-bd'>
                    <Card.Body>
                        <Card.Title>Dr. {doctor["firstname"]} {doctor["lastname"]}</Card.Title>
                        <Card.Text>
                            {doctor["feild"]} {doctor["qualification"]}
                            <br></br>
                            {doctor["email"]}
                        </Card.Text>
                    </Card.Body>
                    </div>

                    <div className='crd-btn'>
                        <Card.Body>
                            <Link to="/bookappointment2">
                                <Button variant="dark" onClick={() => window.localStorage.setItem("doctoremail", doctor["email"])}>
                                    Book Appointment
                                </Button>
                            </Link>
                        </Card.Body>
                    </div>
                </Card>
                <br />
            </>
            )}
            </div>
        </div>
    )
}