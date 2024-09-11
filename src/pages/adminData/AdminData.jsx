import React from "react";
import { useLoaderData } from "react-router-dom";

const AdminData = () => {
  const adminData = useLoaderData(); // Assuming this is an array of coupon objects

  return (
    <div className="mb-14">
      <h1 className="text-center text-4xl text-purple-700 m-8">
        Total Coupons: {adminData.length}
      </h1>
      {adminData.map((coupon, index) => (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">Coupon {index + 1}</h2>

          <div
            key={coupon._id}
            className="md:max-w-lg text-center border rounded-lg mx-auto p-4 px-6 mb-4"
          >
            <h2 className="text-xl font-bold">Name: {coupon.name}</h2>
            <p>
              <strong>Email:</strong> {coupon.email}
            </p>
            <p>
              <strong>Time:</strong> {coupon.select}
            </p>
            <p>
              <strong>Date:</strong> {coupon.date}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default AdminData;
