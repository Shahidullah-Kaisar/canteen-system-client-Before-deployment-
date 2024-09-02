import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {

  const {user} = useContext(AuthContext)
  // console.log(user.displayName)

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/bP4ZQjm/bg1.jpg)",
      }}
    >

      <div className="-mt-96 text-center">
         <h2 className="text-[#ff48c8] text-3xl md:text-5xl font-semibold">{user && user.emailVerified ? user.displayName : ""}</h2>
      </div>
     

      <div className="hero-overlay bg-opacity-40"></div>
      
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
            
          <h1 className="mb-5 text-5xl font-bold text-yellow-600">Buy Your Coupon</h1>
          <p className="mb-5 text-yellow-100">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-secondary"><Link to='/login'>Get Started</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Home;
