import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-3xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        {/* Car Image with Blue Background */}
        <div className="bg-blue-100 rounded-full px-8 py-4">
          <img
            className="h-20"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Uber Car"
          />
        </div>
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <i className="text-xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-base -mt-1 text-gray-600">Car</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-400">
            <i className="text-xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-xl font-medium">562/11-A</h3>
              <p className="text-abse -mt-1 text-gray-600">Your destination</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-xl ri-currency-line"></i>
            <div>
              <h3 className="text-xl font-medium">₹193.35</h3>
              <p className="text-base -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <button onClick={()=>{
            props.setVehicleFound(true)
            props.setConfirmRidePanel(false);
        }} className="w-full mt-5 bg-green-600 text-white font-bold text-xl p-2 rounded-lg">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
