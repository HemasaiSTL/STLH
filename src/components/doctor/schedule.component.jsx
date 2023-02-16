
import React, { useState } from 'react'
import { addsloturl, Alldays, checkslotinslots, deletesloturl, getdoctorsloturl } from '../../utils/constants';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function ScheduleManagement() {
    const [allslots, setallslots] = useState([])
    const [data, setData] = useState({
        slot: "",
        sid: "",
        date: ""
    })

    function formatdt(x) {
        var newx = ""
        if ((x.toString()).length === 1) {
            newx = '0' + x.toString();
            return newx
        }
        return x.toString()
    }

    var dtToday = new Date()
    var adddate = new Date()
    adddate.setDate(adddate.getDate() + 7)
    var month = (dtToday.getMonth() + 1)
    var year = (dtToday.getFullYear())
    var day = (dtToday.getDate() + 1)
    var monthplus = (adddate.getMonth() + 1)
    var dayplus = (adddate.getDate() + 1)
    var yearplus = (adddate.getFullYear())
    var mindate = year.toString() + "-" + formatdt(month) + "-" + formatdt(day)
    var maxdate = yearplus.toString() + "-" + formatdt(monthplus) + "-" + formatdt(dayplus)

    axios.get(getdoctorsloturl + (window.localStorage.getItem("name")))
        .then(res => {
            let temp = res.data
            temp = JSON.stringify(temp)
            window.localStorage.setItem("doctorslot", temp)
        })
    

    function checkslot(s) {
        axios.get(checkslotinslots + (window.localStorage.getItem("name")) + "/" + data.date + "/" + s)
                .then(function (res) {
                    console.log(res.data)
                    if (res.data === "") {
                        window.sessionStorage.setItem(s,true)
                    } else {
                        window.sessionStorage.setItem(s,false)
                    }
                })
        return true
    }
    var doctorslot = JSON.parse(window.localStorage.getItem("doctorslot"))
    // eslint-disable-next-line


    function addslot(e) {
        e.preventDefault();
        if (data.date === "" || data.slot === "") {
            alert("Enter Valid details")
            return
        }

        axios.post(addsloturl, {
            demail: window.localStorage.getItem("name"),
            date: data.date,
            slot: data.slot
        },)
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    alert("Slot Added")
                    window.location.href = "/myschedule"
                }
            })
    }

    function deleteslot(e) {
        e.preventDefault();
        axios.delete(deletesloturl + data.sid)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    alert("Slot Deleted")
                    window.location.href = "/myschedule"
                }
            })
    }


    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
        if (e.target.id === "date") {
            setallslots(Alldays)
        }
    }

    return (
        <>
            <div className="text-center bg-dark" >
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1 className="fw-light">Schedule Management</h1>
                </div>
            </div>
            <div className='bg-grey fullheight'>
                <form>
                    <Row xs={1} md={2} className="g-4">
                        <Col>
                            <div className='auth-wrapper'>
                                <div className='auth-inner'>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>SlotId</th>
                                                <th>Date</th>
                                                <th>Slot</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {doctorslot.map(slot =>
                                                <tr>
                                                    <td>{slot["sid"]}</td>
                                                    <td>{slot["date"]}</td>
                                                    <td>{slot["slot"]}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div className='auth-wrapper'>
                                <div className='auth-inner-utils'>
                                    <div className="mb-3 row">
                                        <div className='col'>
                                            <label>Date</label>
                                            <input type="date" id="date" onChange={(e) => handle(e)} value={data.date} className='form-control' min={mindate} max={maxdate}></input>
                                        </div>

                                        <div className="col">
                                            <label>Slot</label>
                                            <Form.Select value={data.slot} id="slot" onChange={(e) => handle(e)}>
                                                <option> </option>
                                                {allslots.map(day =>
                                                    (checkslot(day)) === true ?
                                                        window.sessionStorage.getItem(day) === "true" ?
                                                            <option key={day}>{day}</option>
                                                            :
                                                            <></>
                                                        :
                                                        null
                                                )}
                                            </Form.Select>
                                        </div>

                                        <div className="col">
                                            <br></br>
                                            <button type="submit" className="btn btn-dark" onClick={(e) => addslot(e)}>
                                                Add Slot
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col">
                                            <label>Slot ID</label>
                                            <Form.Select value={data.sid} id="sid" onChange={(e) => handle(e)}>
                                                <option> </option>
                                                {doctorslot.map(s =>
                                                    <option key={s["sid"]}>{s["sid"]}</option>
                                                )}
                                            </Form.Select>
                                        </div>

                                        <div className="col">
                                            <br></br>
                                            <button className="btn btn-dark" onClick={(e) => deleteslot(e)}>
                                                Delete Slot
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </form>
            </div>
        </>
    )
}

