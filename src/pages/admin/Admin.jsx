import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Admin = () => {

    const navigate = useNavigate()

     const handleAdmin = (e) =>{

        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const adminData = {email, password};
        console.log(adminData);

        if (password === "123") {
            navigate("/adminData"); // Replace '/adminData' with the actual route of your AdminData page
          } else {
            alert("Incorrect password. Please try again.");
          }
        
     }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="card bg-base-100 md:w-[500px] shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleAdmin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-2xl">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-lg">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-xl">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
