import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Coupon = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  const handleCoupon = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const select = e.target.select.value;
    const amount = e.target.amount.value;
    const date = e.target.date.value;

    const couponData = { name, email, amount, select, date };
    console.log(couponData);

    fetch("https://canteen-system-server-373v7q163.vercel.app/coupon", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(couponData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          Swal.fire({
            title: "Successful!",
            text: "Your Coupon is Ready.",
            icon: "success",
          });

          navigate("/showcoupon");
        }
      });
  };


  return (
    <>
      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url(https://i.ibb.co/bP4ZQjm/bg1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <form onSubmit={handleCoupon}>
          <div className="bg-base-100 p-8 -mt-60 md:p-16">
            <label className="input input-bordered flex items-center gap-2 mb-3 text-xl">
              Name:
              <input type="text" name="name" className="grow text-lg" />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-3 text-xl">
              Email:
              <input
                type="text"
                name="email"
                className="grow text-lg"
                defaultValue={user.email}
                disabled
              />
            </label>
            <select
              className="select select-bordered w-full max-w-xs mb-3 text-xl"
              name="select"
            >
              <option>All (60 taka)</option>
              <option>Day (30 taka)</option>
              <option>Night (30 taka)</option>
            </select>

            <label className="input input-bordered flex items-center gap-2 mb-3 text-xl">
              Amount:
              <input type="text" name="amount" className="grow text-lg" />
            </label>
            <label className="input input-bordered flex items-center gap-2 text-xl">
              Date:
              <input type="date" name="date" className="grow text-xl" />
            </label>
            <div className="">
              <button className="btn btn-secondary mt-10 w-full text-xl">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Coupon;
