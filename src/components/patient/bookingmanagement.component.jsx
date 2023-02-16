
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { getbookings, getdoctorurl } from '../../utils/constants';
import jsPDF from 'jspdf'

export default function Mybookings() {
    var [appointments, setAppointments] = useState([])
    const [docdetails,setDoctdetails] = useState({})
    useEffect(() => {
        axios.get(getbookings + (window.localStorage.getItem("name")))
            .then((res) => {
                setAppointments(res.data);
            });

    }, []);
    console.log(appointments)
    // appointments.forEach(string =>{
    //     let temp=string.split(",")
    //     console.log(temp)
    // })

    function generatepdf(e, temp) {
        e.preventDefault()
        axios.get(getdoctorurl+temp.split(",")[1])
        .then(res => {
            setDoctdetails(JSON.parse(JSON.stringify(res.data)))
        })
        var doc = new jsPDF('p', 'pt');
        doc.text(220, 40, "Appointment Id : " + temp.split(",")[0])
        doc.text(30, 100, 'Patient Details')
        doc.text(30, 105, '____________')
        doc.text(30, 140, "Patient Name      : " + temp.split(",")[2])
        doc.text(300, 140, "Age          : " + temp.split(",")[3])
        doc.text(30, 180, "Patient Gender    : " + temp.split(",")[4])
        doc.text(300, 180, "Contact    : " + temp.split(",")[5])
        doc.text(30, 220, "Appointment Date : " + temp.split(",")[7])
        doc.text(300, 220, "Slot          : " + temp.split(",")[8])
        doc.text(30, 300, 'Doctor Details')
        doc.text(30, 305, '____________')
        doc.text(30, 340, "Name   : " + docdetails["firstname"].toUpperCase()+" "+docdetails["lastname"].toUpperCase())
        doc.text(300, 340, "Qualification   : " + docdetails["qualification"])
        doc.text(30, 380, "Feild     : " + docdetails["feild"])
        doc.text(300, 380,"Email      : " + docdetails["email"])
        doc.text(30, 500, "Amount Paid         : Two Hudred Fifty Rupees Only")
        doc.text(30, 600, "Address:STL Hospitals,2JV7+J92,\nThe Cube at Karle Town Center Rd,\nDadaMastan Layout, Manayata Tech Park,\nNagavara, Bengaluru, Karnataka 560024")
        doc.save('Receipt.pdf')
    }

    return (
        <div className='welcome'>
            <form>
                <div class="text-center bg-dark" >
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">My Appointments</h1>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>AppointmentID</th>
                            <th>Doctor Email</th>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Contact</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Get Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((temp) =>
                            <tr>
                                <td>{temp.split(",")[0]}</td>
                                <td>{temp.split(",")[1]}</td>
                                <td>{temp.split(",")[2]}</td>
                                <td>{temp.split(",")[3]}</td>
                                <td>{temp.split(",")[4]}</td>
                                <td>{temp.split(",")[5]}</td>
                                <td>{temp.split(",")[7]}</td>
                                <td>{temp.split(",")[8]}</td>
                                <th><button type="button" className="btn btn-dark" onClick={(e) => generatepdf(e, temp)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cloud-download" viewBox="0 0 16 16">
                                        <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"></path>
                                        <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"></path>
                                    </svg>
                                </button></th>
                                {/* <th><button type="button" className="btn btn-primary">Update</button></th> */}
                            </tr>
                        )}
                    </tbody>
                </Table>
            </form>
        </div>
    )
}

