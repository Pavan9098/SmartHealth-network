// import Register from "./Register";
// import React from 'react';

// function App() {
//   return (
//     <div className="App">
//      <Register />
//     </div>
//   );
// }

// export default App;
import React from "react";
import Login from './Login';

import HospitalRegistrationForm from "./Hospital_Registrationform";
import UserRegistrationForm from "./Usersform";
import HomePage from "./Homepage";
import UserView from "./UserView";
import HospitalInfo from "./HospitalInfo";
import Docappoint from './DocAppointments';
import GoogleCalendar from "./GoogleCalendar";
import DoctorProfile from "./DoctorProfile";
import UserAppointments from "./UserAppointments";
//import './App.css';
import MapComponent from "./Mapcomponent";

import {BrowserRouter, Routes, Route} from "react-router-dom"


function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/hosreg' element={<HospitalRegistrationForm />}></Route>
                <Route path='/userreg' element={<UserRegistrationForm/>}></Route>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/userview' element={<UserView/>}></Route>
                <Route path='/hospitalinfo' element={<HospitalInfo />}></Route>
                <Route path='/docappoint' element={<Docappoint />}></Route>
                <Route path='/googlecal' element={<GoogleCalendar />}></Route>
                <Route path='/docprofile' element={<DoctorProfile />}></Route>
                <Route path='/userappointments' element={<UserAppointments />}></Route>
                <Route path='/maps' element={<MapComponent />}></Route>
                <Route path='/hospital/:id' element={<HospitalInfo />}></Route>
                
            </Routes>
        </BrowserRouter>
        
    
    )
}
export default App;