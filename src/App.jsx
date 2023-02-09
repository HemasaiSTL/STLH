import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Home } from './components/home/home.component';
import Loginnav from './components/navbar/loginnav.component';
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/loginsignup/Login.component';
import { doctorloginurl, patientloginurl } from './utils/constants';
import SignUp from './components/loginsignup/Signup.component';
import Logoutnav from './components/navbar/logoutnav.component';
import Profile from './components/doctor/profile.component';
import Viewdoctors from './components/patient/viewdoctors.component';
import PatientsBooking from './components/patient/patientbooking.component';
import ScheduleManagement from './components/doctor/schedule.component';
import Viewappointments from './components/doctor/viewappointments.component.';
import Mybookings from './components/patient/bookingmanagement.component';

function App() {
  return (
    <Router>
      <div className="App">
        {window.localStorage.getItem("jwt") ? <Logoutnav></Logoutnav> :
          <Loginnav></Loginnav>
        }
        <div className="auth-wrapper">
          <div className="auth-inner">
            {window.localStorage.getItem("jwt") ?
              (window.localStorage.getItem("type") === "Doctor" ?
                <Routes>
                  <Route path='/' element={<Viewappointments />}></Route>
                  <Route path='/doctorprofile' element={<Profile type="Doctor"></Profile>}></Route>
                  <Route path='/myschedule' element={<ScheduleManagement />}></Route>
                  <Route path='/viewappointments' element={<Viewappointments />}></Route>
                </Routes>
                :
                <Routes>
                  <Route exact path="/" element={<Viewdoctors />} />
                  <Route exact path="/mybookings" element={<Mybookings />} />
                  <Route path='/patientprofile' element={<Profile type="Patient"></Profile>}></Route>
                  <Route path="/bookappointment1" element={<Viewdoctors />} />
                  <Route path="/bookappointment2" element={<PatientsBooking />} />
                  
                </Routes>
              )
              :
              <Routes>
                <Route exact path="/" element={<Home></Home>} />
                <Route path="/doctorlogin" element={<Login type="Doctor" url={doctorloginurl} />} />
                <Route path="/patientlogin" element={<Login type="Patient" url={patientloginurl} />} />
                <Route path="/sdoctor" element={<SignUp type="Doctor" />} />
                <Route path="/spatient" element={<SignUp type="Patient" />} />
              </Routes>
            }
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
