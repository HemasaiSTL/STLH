import axios from 'axios';
import React from 'react'
import { getalldoctorsurl } from '../../utils/constants';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export function Home() {
    let alldoctors = []
    axios.get(getalldoctorsurl)
        .then(res => {
            let temp = res.data
            temp = JSON.stringify(temp)
            window.localStorage.setItem("alldoctors", temp)
        })
    alldoctors = JSON.parse(window.localStorage.getItem("alldoctors"))
    return (
        <>
            <section class="py-5 text-center container" >
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Your Healthcare<br></br>is our Purpose</h1>
                    </div>
                </div>
            </section>

            <div className='bg-grey'>
                <h2>Our Doctors</h2><br />
                <div className='cardspad'>
                    <Row xs={1} md={3} className="g-4">
                        {alldoctors.map(doctor =>
                            <Col>
                                <Card style={{ width: '20rem' }}>
                                    <Card.Body>
                                        <Card.Title>Dr. {doctor["firstname"]} {doctor["lastname"]}</Card.Title>
                                        <Card.Text>
                                            {doctor["feild"]} {doctor["qualification"]}
                                            <br></br>
                                            {doctor["email"]}
                                        </Card.Text>
                                        <Link to="/patientlogin">
                                            <Button size='sm' variant='dark'>
                                                Book Appointment
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
            <div className='sp-style'>
                <h2>Our Specalities</h2><br />
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    <div className='col'>
                        <Card className='text-center'>
                            <Card.Body>
                                <Card.Title>Orthopedic</Card.Title>
                                <Card.Text>350+ Surgeries</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='col'>
                        <Card className='text-center'>
                            <Card.Body>
                                <Card.Title>Cardiology</Card.Title>
                                <Card.Text>200+ Surgeries</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='col'>
                        <Card className='text-center'>
                            <Card.Body>
                                <Card.Title>Dental</Card.Title>
                                <Card.Text>150+ Happy teeth</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <div className='conatiner footer'>
                <h4>Contact Us</h4>
                <div className="row g-2">
                    <div className='col'>
                        +91 8106340364 <br />
                        stlh@helpdesk.com
                    </div>
                    <div className='col'>
                        <h5>Address</h5>
                        104-09-45,STL Hospitals,
                        karletown,kaveri 2nd cross<br />
                        Bengaluru, Karnatka.
                    </div>
                </div>
            </div>

        </>
    );
}
