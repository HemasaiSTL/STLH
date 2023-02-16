
import React, { useState } from 'react'
import { bookappointmenturl, checksloturl, getslotsbydateurl } from '../../utils/constants';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import PaymentModal from './payment.component';

export default function PatientsBooking() {

  const [doctorslot, setDoctorslot] = useState([]);
  const [showpay, setShowpay] = useState(false);
  const [paydone, setPaydone] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    phnnumber: "",
    gender: "",
    age: "",
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


  function slotexit(sid) {
    axios.get(checksloturl + sid)
      .then(res => {
        console.log(res.data)
        if (res.data === "") {
          window.localStorage.setItem(sid, true)
          console.log(window.localStorage.getItem(sid))
        } else {
          window.localStorage.setItem(sid, false)
          console.log(window.localStorage.getItem(sid))
        }
      })
    return (window.localStorage.getItem(sid))
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

  function pay(e) {
    e.preventDefault()
    setShowpay(true)
  }

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    if (e.target.id === "date") {
      axios.get(getslotsbydateurl + e.target.value + "/" + (window.localStorage.getItem("doctoremail")))
        .then(res => {
          let temp = res.data
          temp = JSON.stringify(temp)
          setDoctorslot(JSON.parse(temp))
        })
    }
    console.log(newdata)
  }

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner-ep'>
        <form onSubmit={(e) => { submit(e) }}>
          <div class="formhead bordersoft" >
            <h3 class="fw-light">Book Appointment</h3>
          </div>
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

          <div className="mb-3 row">
            <div className='col'>
              <label>Date</label>
              <input type="date" className='form-control' id='date' onChange={(e) => handle(e)} value={data.date} min={mindate} max={maxdate}></input>
            </div>
            <div className='col'>
              <label>Slot</label>
              <Form.Select value={data.sid} id="sid" onChange={(e) => handle(e)}>
                <option> </option>
                {/* eslint-disable-next-line */}
                {doctorslot.map(slot =>
                  // <option key={slot["sid"]} value={slot["sid"]}>{slot["day"]}</option>
                  slotexit(slot["sid"]) === "true" ?
                    <option key={slot["sid"]} value={slot["sid"]}>{slot["slot"]}</option>
                    :
                    <></>
                )}
                <option disabled> No Slots</option>
              </Form.Select>
            </div>
          </div>


          <div className="d-grid">
            <div className='btn-lg-sp'>
              <button className="btn btn-dark" onClick={(e) => pay(e)} disabled={paydone}>
                Pay to Book
              </button>
            </div>
            <br></br>
            <div className='btn-lg-sp'>
              <button type="submit" className="btn btn-dark" disabled={!paydone}>
                Book Appointment
              </button>
            </div>
          </div>
          <PaymentModal
            show={showpay}
            onHide={() => {
              setShowpay(false)
              setPaydone(true)
            }} />
        </form>
      </div>
    </div>
  )
}

