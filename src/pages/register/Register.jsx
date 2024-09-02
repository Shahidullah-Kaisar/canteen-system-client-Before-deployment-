import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { createRegisterUser } = useContext(AuthContext);
  console.log(createRegisterUser);

  const [registerError, setRegisterError] = useState("");
  // const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, photo, password, accepted);

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password should be at least one Upper Case letters.");
      return;
    } else if (!accepted) {
      setRegisterError("Please Accept Our terms and conditon");
      return;
    }

    // setSuccess("");
    setRegisterError("");

    createRegisterUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        // setSuccess("User Created Successfully");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registratioin Successfull",
          showConfirmButton: false,
          timer: 2000,
        });

        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log("Profile Updated");
          })
          .catch((error) => {
            console.log(error);
          });

        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verify your account");
        });
      })

      .catch((error) => {
        console.log(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/hMdL2KB/bg3.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-full max-w-md">          
          <div className="card shrink-0 shadow-2xl w-full sm:w-96">        
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-yellow-500 text-3xl">
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input focus:border-purple-700 focus:outline-none border-purple-700 bg-transparent placeholder-purple-700"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-yellow-500 text-3xl">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input focus:border-purple-700 focus:outline-none border-purple-700 bg-transparent placeholder-purple-700"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="URL"
                  className="input focus:border-purple-700 focus:outline-none border-purple-700 bg-transparent placeholder-purple-700"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-yellow-500 text-3xl">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input focus:border-purple-700 focus:outline-none border-purple-700 bg-transparent placeholder-purple-700"
                  required
                />
              </div>
              <div className="m-1">
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms" className="ml-2">
                  Accept our terms and condition
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary text-2xl">
                  Register Now
                </button>
              </div>
              <p className="text-lg mt-2">
                Already have an Account? Please{" "}
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </p>
            </form>
            {registerError && (
              <p className="text-red-700 text-lg mb-2">{registerError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
