
import React, { useState } from 'react'
import { addsloturl, Alldays, deletesloturl, getdoctorsloturl } from '../../utils/constants';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';

export default function ScheduleManagement() {
    var alldays = Alldays
    var slotids = []
    const [data, setData] = useState({
        day: "",
        queue: "",
        sid: ""
    })

    axios.get(getdoctorsloturl + (window.localStorage.getItem("name")))
        .then(res => {
            let temp = res.data
            temp = JSON.stringify(temp)
            window.localStorage.setItem("doctorslot", temp)
        })

    var doctorslot = JSON.parse(window.localStorage.getItem("doctorslot"))
    // eslint-disable-next-line
    doctorslot.map(slot => {
        delete alldays[alldays.indexOf(slot["day"])]
        slotids.push(slot["sid"])
    }
    )

    function addslot(e) {
        e.preventDefault();
        axios.post(addsloturl, {
            demail: window.localStorage.getItem("name"),
            day: data.day,
            queue: data.queue
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
        axios.delete(deletesloturl+data.sid)
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
    }

    return (
        <form>
            <h3>My Schedule</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>SlotId</th>
                        <th>Day</th>
                        <th>Patients</th>
                    </tr>
                </thead>
                <tbody>
                    {doctorslot.map(slot =>
                        <tr>
                            <td>{slot["sid"]}</td>
                            <td>{slot["day"]}</td>
                            <td>{slot["queue"]}</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className="mb-3 row">
                <div className="col">
                    <label>Day</label>
                    <Form.Select value={data.day} id="day" onChange={(e) => handle(e)}>
                        <option> </option>
                        {alldays.map(day =>
                            <option key={day}>{day}</option>
                        )}
                    </Form.Select>
                </div>

                <div className="col">
                    <label>No.of Patients</label>
                    <input
                        onChange={(e) => handle(e)}
                        id="queue"
                        value={data.queue}
                        type="number" className="form-control" max="10" min="1" />
                </div>

                <div className="col">
                    <br></br>
                    <button type="submit" className="btn btn-primary" onClick={(e) => addslot(e)}>
                        Add Slot
                    </button>
                </div>
            </div>

            <div className="mb-3 row">
                <div className="col">
                    <label>Slot ID</label>
                    <Form.Select value={data.sid} id="sid" onChange={(e) => handle(e)}>
                        <option> </option>
                        {slotids.map(s =>
                            <option key={s}>{s}</option>
                        )}
                    </Form.Select>
                </div>

                <div className="col">
                    <br></br>
                    <button className="btn btn-primary" onClick={(e) => deleteslot(e)}>
                        Delete Slot
                    </button>
                </div>
            </div>

        </form>
    )
}

