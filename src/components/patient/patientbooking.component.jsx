
import React, { useState } from 'react'
import { bookappointmenturl, checksloturl, getdoctorsloturl } from '../../utils/constants';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import PaymentModal from './payment.component';

export default function PatientsBooking() {
  const [flag, setFlag] = useState(false)
  const [showpay, setShowpay] = useState(false);
  const [paydone, setPaydone] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    phnnumber: "",
    gender: "",
    age: "",
    sid: ""
  })

  axios.get(getdoctorsloturl + (window.localStorage.getItem("doctoremail")))
    .then(res => {
      let temp = res.data
      temp = JSON.stringify(temp)
      window.localStorage.setItem("doctorslot", temp)
    })
  let doctorslot = JSON.parse(window.localStorage.getItem("doctorslot"))
  var slots=[]
  function slotexit(sid){
    console.log("hi")
    axios.get(checksloturl + sid + "/" + window.localStorage.getItem("name"))
      .then(res => {
        if (res.data === "") {
          slots.push()
        } else {
          setFlag(true)
        }
      })
    return flag
  }

  function validatedetails() {
    if (data.fullname !== "" && data.gender !== "" && data.sid !== "" && data.phnnumber !== "" && data.age !== "" && parseInt(data.age) > 0) {
      return true
    }
    return false
  }
  function submit(e) {
    e.preventDefault();
    if (!validatedetails()) {
      alert("Enter Vaild details")
      return
    }
    axios.post(bookappointmenturl, {
      fullname: data.fullname,
      age: data.age,
      phnnumber: data.phnnumber,
      gender: data.gender,
      pemail: window.localStorage.getItem("name"),
      sid: data.sid
    },)
      .then(res => {
        console.log(res)
        if (res.status !== 201) {
          alert("Booking Unsucess Please enter the correct details")
        } else {
          window.location.href = "/"
        }
      })
  }

  function pay() {
    setShowpay(true)
  }

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  return (
    <form onSubmit={(e) => { submit(e) }}>
      <div className="mb-3 row">
        <div className="col">
          <label>Full name</label>
          <input onChange={(e) => handle(e)}
            id="fullname"
            value={data.fullname}
            type="text" className="form-control" placeholder="Full name" />
        </div>
        <div className="col">
          <label>Gender</label>
          <Form.Select value={data.gender} id="gender" onChange={(e) => handle(e)}>
            <option></option>
            <option key={"Male"}>Male</option>
            <option key={"Female"}>Female</option>
          </Form.Select>
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col">
          <label>Phone</label>
          <input
            onChange={(e) => handle(e)}
            id="phnnumber"
            value={data.phnnumber}
            type="text" className="form-control" placeholder="Enter Phn-number" />
        </div>
        <div className="col">
          <label>age</label>
          <input
            onChange={(e) => handle(e)}
            id="age"
            value={data.age}
            type="number" className="form-control" placeholder="Enter age" />
        </div>
      </div>

      <div className="mb-3">
        <label>Slot</label>
        <Form.Select value={data.sid} id="sid" onChange={(e) => handle(e)}>
          <option> </option>
          {doctorslot.map(slot =>
          <option key={slot["sid"]} value={slot["sid"]}>{slot["day"]}</option>
          //   {(slotexit(slot["sid"])) ?
          //     <option key={slot["sid"]} value={slot["sid"]}>{slot["day"]}</option> :
          //     <></>
          // }
          )}
        </Form.Select>
      </div>


      <div className="d-grid">
        <button className="btn btn-primary" onClick={() => pay()} disabled={paydone}>
          Pay to Book
        </button>
        <br></br>
        <button type="submit" className="btn btn-primary" disabled={!paydone}>
          Book Appointment
        </button>
      </div>
      <PaymentModal
        show={showpay}
        onHide={() => {
          setShowpay(false)
          setPaydone(true)
        }} />
    </form>
  )
}

