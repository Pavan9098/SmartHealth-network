import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleusernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleusermailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleuserpasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event)=> {
    event.preventDefault();
    try{
      const result = await axios.post('http://localhost:4000/register',{username,email,password});
      if(result.data!=null){
        navigate('/');
      }
    }catch(err){
console.log("error");
    }
    // Reset form inputs if needed
    setUsername('');
    setPassword('');
    setEmail('');
  
  }
  return (
    <div
      className="container"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        padding: "0 330px",
      }}
    >
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img
            className="mb-4"
            src="/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Please Register</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputUsername"
              placeholder="Akula Sri Ram Karthik"
              fdprocessedid="1clrd"
              value={username}
              onChange={handleusernameChange}
            />
            <label for="floatingInputUsername">Username</label>
          </div>

          <div className="form-floating my-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              fdprocessedid="1clrd"
              value={email}
              onChange={handleusermailChange}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating my-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              fdprocessedid="uo01j"
              value={password}
              onChange={handleuserpasswordChange}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            fdprocessedid="i92ymp"
          >
            Sign Up
          </button>

          <p className="mt-5 mb-3 text-body-secondary text-center">
            Powered by SRKR
          </p>
        </form>
      </main>
    </div>
  );
}
export default Register;
