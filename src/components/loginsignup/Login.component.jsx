import React, { useState } from 'react'
import axios from 'axios';
import Dentist from "../../assets/Dentist.png"

export default function Login(props) {
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  function submit(e) {
    e.preventDefault();
    axios.post(props.url, {
      email: data.email,
      password: data.password
    },
    )
      .then(res => {
        console.log(res)
        if (res.status.toString() === "200") {
          if (res.data.includes("org.spring") || res.data.includes("Failed")) {
            alert("Enter Vaild Credentials")
            return
          }
          window.localStorage.setItem("jwt", res.data)
          window.localStorage.setItem("name", data.email)
          window.localStorage.setItem("type", props.type)
          updatepath()
        }
      })
  }

  function updatepath() {
    window.location.href = "/"
  }

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  return (
    <>
      <div className="auth-wrapper">
        <div className="row">
          <div className='col'>
            <img src={Dentist} alt='error' className='img'></img>
          </div>
          <div className='col'>   
          <div className="auth-inner">
              <form onSubmit={(e) => submit(e)}  >
                <h3>{props.type} Login</h3>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    onChange={(e) => handle(e)}
                    id="email"
                    value={data.email}
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    onChange={(e) => handle(e)}
                    id="password"
                    value={data.password}
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
                <div className='btn-lg-sp'>
                <button type="submit" className="btn btn-dark">
                    Login
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}