import React, { useState } from 'react'
import { docdelurl, Feild, getdoctorurl, getpatienturl, paidelurl, Qualification, updatedoctorurl, updatepatienturl } from '../../utils/constants';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

export default function Profile(props) {
  let geturl = ""
  if (props.type === 'Doctor') {
    geturl = getdoctorurl + window.localStorage.getItem("name")
  } else {
    geturl = getpatienturl + window.localStorage.getItem("name")
  }

  let updateurl = ""
  if (props.type === 'Doctor') {
    updateurl = updatedoctorurl + window.localStorage.getItem("name")
  } else {
    updateurl = updatepatienturl + window.localStorage.getItem("name")
  }

  let delurl = ""
  if (props.type === 'Doctor') {
    delurl = docdelurl + window.localStorage.getItem("name")
  } else {
    delurl = paidelurl + window.localStorage.getItem("name")
  }


  if (props.type === "Doctor") {
    axios.get(geturl)
      .then(res => {
        window.localStorage.setItem("details", JSON.stringify(res.data))
      })
  } else {
    axios.get(geturl, {
      headers: {
        'Authorization': "Bearer " + window.localStorage.getItem('jwt')
      }
    })
      .then(res => {
        window.localStorage.setItem("details", JSON.stringify(res.data))
      })
  }


  let details = window.localStorage.getItem("details")
  details = JSON.parse(details)

  let [data, setData] = useState({
    firstname: details["firstname"],
    lastname: details["lastname"],
    email: details["email"],
    feild: details["feild"],
    qualification: details["qualification"],
    phnnumber: details["phnnumber"],
    password: details["password"],
    gender: details["gender"],
    age: details["age"]
  })

  function doctorsubmit(e) {
    e.preventDefault();
    axios.put(updateurl, {
      firstname: data.firstname,
      lastname: data.lastname,
      feild: data.feild,
      email: data.email,
      qualification: data.qualification,
      password: data.password,
      phnnumber: data.phnnumber
    }, {
      headers:
      {
        'Authorization': "Bearer " + window.localStorage.getItem('jwt')
      }
    })
      .then(res => {
        console.log(res)
        if (res.status === "200") {
          alert("Details Updated")
          window.location.href = "/doctorprofile"
          window.location.href = "/doctorprofile"
        }
      })
  }

  function patientsubmit(e) {
    e.preventDefault();
    axios.put(updateurl, {
      firstname: data.firstname,
      lastname: data.lastname,
      gender: data.gender,
      email: data.email,
      age: data.age,
      password: data.password,
      phnnumber: data.phnnumber
    }, {
      headers:
      {
        'Authorization': "Bearer " + window.localStorage.getItem('jwt')
      }
    })

      .then(res => {
        console.log(res)
        if (res.status === "200") {
          alert("Details Updated")
          window.location.href = "/patientprofile"
        }
      })
  }


  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  function deleteacc(e) {
    e.preventDefault()
    axios.delete(delurl, {
      headers: {
        'Authorization': "Bearer " + window.localStorage.getItem('jwt')
      }
    })
    window.localStorage.removeItem("jwt")
    window.localStorage.removeItem("type")
    window.location.href = "/"
  }
  // if(props.type==="Doctor"){
  //   window.location.href("/doctorprofile")
  // } else{
  //   window.location.href("/patientprofile")
  // }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner-ep">
        <form onSubmit={(e) => { props.type === "Doctor" ? doctorsubmit(e) : patientsubmit(e) }}>
        <div class="formhead bordersoft" >
              <h3 class="fw-light">Edit Profile</h3>
          </div>
          <div className="mb-3 row">
            <div className="col">
              <label>First name</label>
              <input onChange={(e) => handle(e)}
                id="firstname"
                value={data.firstname}
                type="text" className="form-control" />
            </div>
            <div className="col">
              <label>Last name</label>
              <input onChange={(e) => handle(e)}
                id="lastname"
                value={data.lastname}
                type="text" className="form-control" />
            </div>
          </div>

          {props.type === "Doctor" ?
            <div className="mb-3 row">
              <div className="col">
                <label>Feild</label>
                <Form.Select value={data.feild} id="feild" onChange={(e) => handle(e)}>
                  {Feild.map(f =>
                    <option key={f.toString()}>{f}</option>
                  )}
                </Form.Select>
              </div>
              <div className="col">
                <label>Qualification</label>
                <Form.Select value={data.qualification} id="qualification" onChange={(e) => handle(e)}>
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
                  type="text" className="form-control" />
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
              type="text" className="form-control" />
          </div>
          <div className='btn-lg-sp'>
            <button type="submit" className="btn btn-dark">
              Update
            </button>
          </div>
          <br/>
          <div className='btn-lg-sp'>
            <button type="button" className="btn btn-dark" onClick={(e) => deleteacc(e)}>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

