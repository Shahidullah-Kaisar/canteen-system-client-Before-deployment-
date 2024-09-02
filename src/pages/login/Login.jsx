import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInGoogle } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();

        if (result.user.emailVerified) {
          toast.success("Login Successfull");

          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          alert("Please verify your email address.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log("google sign in", result);

        if (result.user.emailVerified) {
          toast.success("Login Successfull");

          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          alert("Please verify your email address.");
        }
      })
      .catch((error) => {
        console.log("google sign in error", error);
      });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/Wg2v4z0/bg2.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-full max-w-md">
          <div className="card shrink-0 shadow-2xl w-full sm:w-96 md:ml-60">
            <form className="card-body" onSubmit={handleLogin}>
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
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover hover:underline text-xl text-yellow-500"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary text-2xl">Login</button>
                <ToastContainer
                  position="top-center"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
              <p className="text-lg mt-2">
                New to the Website? Please{" "}
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </p>
            </form>
            <div className="mx-auto mb-5 -mt-2 text-lg md:text-xl border p-2 px-8 rounded-lg">
              <button
                className="flex items-center"
                onClick={handleGoogleSignIn}
              >
                SignIn With Google
                <FcGoogle className="text-3xl ml-1"></FcGoogle>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
