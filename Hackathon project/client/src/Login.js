import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:4000/login', { email, password });
      const { token, role, userId } = result.data;
  
      if (token) {
        localStorage.setItem("token", token);
         // Store the userId in localStorage
        localStorage.setItem("role", role);
        if (role === 'hospital') {
          try {
            // Fetch the hospital data using userId from the backend
            const response = await axios.get(`http://localhost:4000/get-hospital-by-user/${userId}`);
            const hospitalId = response.data.hospital._id;
    
            // Navigate to the hospital page with the retrieved hospitalId
            navigate(`/hospital/${hospitalId}`);
          } catch (error) {
            console.error('Error fetching hospital data:', error);
            alert('Error fetching hospital data');
          }
          navigate(`/hospital/${userId}`);
        } else if (role === 'doctor') {
          localStorage.setItem("userId", userId);
          navigate('/docappoint');
        } else {
          localStorage.setItem("userId", userId);
          navigate('/userview');
        }
      } else {
        alert('Login failed: Invalid credentials or user not found');
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert('An error occurred during login. Please try again.');
    }
  
    setPassword('');
    setEmail('');
  };

  return (
    <div className="container" style={{ alignItems: "center", display: "flex", justifyContent: "center", height: "100vh", padding: "0 330px" }}>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={handleEmailChange} />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating my-3">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign In
          </button>
        </form>
        <p className="mt-5 mb-3 text-body-secondary text-center">Powered by SRKR</p>
      </main>
    </div>
  );
}

export default Login;
