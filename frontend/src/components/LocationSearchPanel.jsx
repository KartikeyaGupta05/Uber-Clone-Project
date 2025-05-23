import React from 'react'
import {
  FaMapMarkerAlt,
  FaTrain,
  FaHotel,
  FaPlaneDeparture,
  FaMapMarkedAlt,
  FaBuilding
} from 'react-icons/fa';

const locations = [
  {
    icon: <FaPlaneDeparture className="text-xl text-gray-600" />,
    name: "Kempegowda International Airport",
    address: "KIAL Rd, Devanahalli, Bengaluru, Karnataka"
  },
  {
    icon: <FaMapMarkerAlt className="text-xl text-gray-600" />,
    name: "Phoenix Marketcity",
    address: "Whitefield Rd, Devasandra Industrial Estate, Mahadevapura, Bengaluru, Karnataka"
  },
  {
    icon: <FaBuilding className="text-xl text-gray-600" />,
    name: "Salarpuria Aura Block B",
    address: "BLOCK-B, TOUCH STONE, Chandana, Kadabeesanahalli, Bengaluru, Karnataka"
  },
  {
    icon: <FaHotel className="text-xl text-gray-600" />,
    name: "Sheraton Grand Bengaluru Whitefield",
    address: "Prestige Shantiniketan Hoodi, Whitefield, Thigalarapalya, Krishnarajapura, Bengaluru"
  },
  {
    icon: <FaTrain className="text-xl text-gray-600" />,
    name: "KSR Bengaluru City Junction (Bangalore)",
    address: "M.G. Railway Colony, Majestic, Bengaluru, Karnataka"
  },
];

const LocationSearchPanel = (props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {locations.map((loc, idx) => (
        <div onClick={() =>{
          props.setVehiclePanelOpen(true);
          props.setPanelOpen(false)
        }} key={idx} className="flex p-2 border-2 rounded-xl border-white active:border-black items-center gap-3 mb-4">
          <div>{loc.icon}</div>
          <div>
            <p className="text-lg font-medium text-gray-800">{loc.name}</p>
            <p className="text-sm text-gray-500">{loc.address}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 text-blue-600 hover:underline cursor-pointer mt-6">
        <FaMapMarkedAlt className="text-xl" />
        <span>Set location on map</span>
      </div>
    </div>
  )
}

export default LocationSearchPanel
