import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Card } from "antd";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

const ShowCoupon = () => {
  const { user, setLoading } = useContext(AuthContext);
  // console.log(user);

  const loaderData = useLoaderData();

  // console.log("Show Coupon", loaderData);

  const filteredCoupons = loaderData.filter(
    (coupon) => coupon.email === user?.email
  );

  const totalAmount = filteredCoupons.reduce((sum, coupon) => {
    return sum + (parseFloat(coupon.amount) || 0); // Assuming 'amount' is the field for price/amount of the coupon
  }, 0);

  const handleDeleteCoupon = (id) => {
    console.log("id", id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://canteen-system-server-373v7q163.vercel.app/coupon/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);

            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              window.location.reload();
              const remaining = coffees.filter((cof) => cof._id !== _id);
              setCoffees(remaining);
            }
          });
      }
    });
  };

  const [click, setClick] = useState(false);

  const handleClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Payment ${totalAmount}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then((result) => {
      if (result.isConfirmed) {
        setClick(true);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Payment Successfull",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  console.log(click);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    const cardWidth = 180; // Width of the card
    const cardHeight = 80; // Height of the card
    const cardMargin = 20; // Margin between cards

    filteredCoupons.forEach((coupon, index) => {
      // Calculate the position of each card
      const x = 10; // X position of the card (same for all cards)
      const y = 10 + index * (cardHeight + cardMargin); // Y position based on index

      // Draw a rectangle to represent the card border
      doc.setDrawColor(128, 0, 128); // Set border color to purple
      doc.rect(x, y, cardWidth, cardHeight);

      // Set text color to purple
      doc.setTextColor(128, 0, 128);
      doc.setFontSize(12);

      // Add text to the card
      doc.text(`Coupon ${index + 1}`, x + 5, y + 10);
      doc.text(`Name: ${coupon.name}`, x + 5, y + 20);
      doc.text(`Email: ${coupon.email}`, x + 5, y + 30);
      doc.text(`Time: ${coupon.select}`, x + 5, y + 40);
      doc.text(`Date: ${coupon.date}`, x + 5, y + 50);
    });

    // Save the generated PDF
    doc.save("coupons.pdf");
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/Wg2v4z0/bg2.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="w-full max-w-md ">
          {filteredCoupons.length > 0 ? (
            <div className="card shrink-0 w-full sm:w-96">
              <Card
                className="bg-transparent md:w-[550px]"
                title={
                  <span className="text-2xl md:text-4xl text-yellow-500">
                    Your Coupon
                  </span>
                }
                bordered={false}
              >
                <div className="w-[250px] md:w-[500px]">
                  <ul className="">
                    {filteredCoupons.map((coupon) => (
                      <li key={coupon._id}>
                        <div className="card-body border-2 border-red-800 rounded-lg mb-4">
                          <h2 className="card-title text-sm md:text-2xl">
                            <span className="text-yellow-700 md:mb-0">
                              Name:
                            </span>{" "}
                            {coupon.name}
                          </h2>
                          <h2 className="card-title text-sm md:text-2xl">
                            <span className="text-yellow-700">Email:</span>{" "}
                            {coupon.email}
                          </h2>
                          <h2 className="card-title text-sm md:text-2xl">
                            <span className="text-yellow-700">Time:</span>{" "}
                            {coupon.select}
                          </h2>
                          <h2 className="card-title text-sm md:text-2xl">
                            <span className="text-yellow-700">Date:</span>{" "}
                            {coupon.date}
                          </h2>
                          <div className="flex -mb-4 justify-end">
                            <button
                              className="btn btn-secondary px-8 md:text-xl"
                              onClick={() => handleDeleteCoupon(coupon._id)}
                            >
                              <Link>Delete</Link>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {click ? (
                    <div className="flex mt-4">
                      <button
                        className="btn btn-warning px-8 md:text-xl md:mr-14 w-full"
                        onClick={handleDownloadPDF}
                      >
                        Download Your Coupon
                      </button>
                    </div>
                  ) : (
                    <div className="flex mt-4">
                      <button
                        className="btn btn-warning px-8 md:text-xl md:mr-14 w-full"
                        onClick={handleClick}
                      >
                        Bkash Payment
                        <span className="text-red-600 font-extrabold">
                          ({totalAmount})
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="text-2xl md:text-4xl text-yellow-500">
              No coupons available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCoupon;
