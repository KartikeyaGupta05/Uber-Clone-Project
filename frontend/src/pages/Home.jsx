// React se component aur hooks import kar rahe hain
import React, { useRef, useState } from "react";

// GSAP animation ke liye custom hook use kar rahe hain
import { useGSAP } from "@gsap/react";

// GSAP library import ki ja rahi hai animations ke liye
import gsap from "gsap";

// Remix icon ka CSS import kiya gaya hai taaki icons use ho sake
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  // Pickup aur destination input fields ke liye state
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  // Panel open hai ya nahi, usko track karne ke liye state
  const [panelOpen, setPanelOpen] = useState(false);

  // useRef ka use DOM elements ko reference dene ke liye kiya gaya hai
  const panelRef = useRef(null); // Jo panel animate hoga uska reference
  const panelCloseref = useRef(null); // Close icon (arrow) ka reference
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  // Form submit hone pe page reload na ho isliye preventDefault use kiya gaya hai
  const submitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP animation hook: Jab panelOpen change hoga tab animation chalega
  useGSAP(
    function () {
      if (panelOpen) {
        // Panel ko height 70% tak animate karo
        gsap.to(panelRef.current, {
          height: "70%",
        });
        // Close arrow ko visible banao
        gsap.to(panelCloseref.current, {
          opacity: "1",
        });
      } else {
        // Panel ko collapse karo
        gsap.to(panelRef.current, {
          height: "0%",
        });
        // Close arrow ko invisible banao
        gsap.to(panelCloseref.current, {
          opacity: "0",
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber ka logo top-left corner mein */}
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      {/* Background image (animated gif) full screen */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      {/* Form section jo bottom mein set hai */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative rounded-lg shadow-md">
          {/* Arrow icon jo panel close karega */}
          <h5
            ref={panelCloseref}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          {/* Heading */}
          <h4 className="text-3xl font-bold">Find a trip</h4>

          {/* Form for pickup and destination */}
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="mt-6 relative"
          >
            {/* Vertical line form ke left mein design ke liye */}
            <div className="absolute top-[26px] left-[25px] h-[64px] w-px bg-gray-700"></div>

            {/* Upar wala dot (pickup) */}
            <div className="absolute left-5 top-[19px] w-3 h-3 bg-black rounded-full"></div>

            {/* Neeche wala square (destination) */}
            <div className="absolute left-5 top-[90px] w-3 h-3 border-2 border-black"></div>

            {/* Pickup input */}
            <input
              onClick={() => {
                setPanelOpen(true); // Panel open karne ke liye
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value); // State update
              }}
              className="bg-[#eee] pl-12 pr-4 py-2 text-lg h-15 rounded-lg w-full mb-3"
              type="text"
              placeholder="Add a pick-up location"
            />

            {/* Destination input */}
            <input
              onClick={() => {
                setPanelOpen(true); // Panel open karne ke liye
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value); // State update
              }}
              className="bg-[#eee] pl-12 pr-4 py-2 h-15 text-lg rounded-lg w-full"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Animated panel jo expand ya collapse hota hai */}
        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
       <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default Home;
