import React, { useState } from 'react'
import { doctorsignupurl, Feild, Qualification, patientsignupurl } from '../../utils/constants';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

export default function SignUp(props) {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    feild: "",
    qualification: "",
    phnnumber: "",
    password: "",
    gender: "",
    age: ""
  })

  function validatedetails() {
    if (data.firstname !== "" &&
      data.email !== "" &&
      data.lastname !== "" &&
      data.password !== "" &&
      data.phnnumber !== "") {
      if ((props.type === "Doctor" && data.qualification !== "" && data.feild !== "")) {
        return true
      } else if((data.age !== "" && data.gender !== "")) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  function doctorsubmit(e) {
    e.preventDefault();
    if (!validatedetails()) {
      alert("Enter Valid Details")
      return
    }
    axios.post(doctorsignupurl, {
      firstname: data.firstname,
      lastname: data.lastname,
      feild: data.feild,
      email: data.email,
      qualification: data.qualification,
      password: data.password,
      phnnumber: data.phnnumber
    },)
      .then(res => {
        
        console.log(res)
        if (res.status === 201) {
          alert("Signup Success")
          window.location.href="/doctorlogin"
        } else{
          alert("Already Registered")
        } 
      })
  }

  function patientsubmit(e) {
    e.preventDefault();
    if(!validatedetails()){
      alert("Enter Valid details")
      return
    }
    axios.post(patientsignupurl, {
      firstname: data.firstname,
      lastname: data.lastname,
      gender: data.gender,
      email: data.email,
      age: data.age,
      password: data.password,
      phnnumber: data.phnnumber
    },)
      .then(res => {
        console.log(res)
        console.log("hello")
        if (res.status === 201) {
          alert("Signup Success")
          window.location.href="/patientlogin"
        } else{
          alert("Already Registered")
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
    <form onSubmit={(e) => { props.type === "Doctor" ? doctorsubmit(e) : patientsubmit(e) }}>
      <h3>{props.type} Sign Up</h3>
      <div className="mb-3 row">
        <div className="col">
          <label>First name</label>
          <input onChange={(e) => handle(e)}
            id="firstname"
            value={data.firstname}
            type="text" className="form-control" placeholder="First name" />
        </div>
        <div className="col">
          <label>Last name</label>
          <input onChange={(e) => handle(e)}
            id="lastname"
            value={data.lastname}
            type="text" className="form-control" placeholder="Last name" />
        </div>
      </div>

      {props.type === "Doctor" ?
        <div className="mb-3 row">
          <div className="col">
            <label>Feild</label>
            <Form.Select value={data.feild} id="feild" onChange={(e) => handle(e)}>
              <option placeholder='Select Feild'></option>
              {Feild.map(f =>
                <option key={f.toString()}>{f}</option>
              )}
            </Form.Select>
          </div>
          <div className="col">
            <label>Qualification</label>
            <Form.Select value={data.qualification} id="qualification" onChange={(e) => handle(e)}>
              <option placeholder='Select qualification' ></option>
              {Qualification.map(q =>
                <option key={q.toString()}>{q}</option>
              )}
            </Form.Select>
          </div>
        </div> :

        <div className="mb-3 row">
          <div className="col">
            <label>Age</label>
            <input onChange={(e) => handle(e)}
              id="age"
              value={data.age}
              type="text" className="form-control" placeholder="age" />
          </div>
          <div className="col">
            <label>Gender</label>
            <Form.Select value={data.gender} id="gender" onChange={(e) => handle(e)}>
              <option ></option>
              <option key={"Male"}>Male</option>
              <option key={"Female"}>Female</option>
            </Form.Select>
          </div>
        </div>
      }

      <div className="mb-3">
        <label>Phone</label>
        <input
          onChange={(e) => handle(e)}
          id="phnnumber"
          value={data.phnnumber}
          type="text" className="form-control" placeholder="Enter Phn-number" />
      </div>

      <div className="mb-3 row">
        <div className='col'>
          <label>Email address</label>
          <input
            onChange={(e) => handle(e)}
            id="email"
            value={data.email}
            type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className='col'>
          <label>Password</label>
          <input
            onChange={(e) => handle(e)}
            id="password"
            value={data.password}
            type="password" className="form-control" placeholder="Enter password" />
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  )
}

