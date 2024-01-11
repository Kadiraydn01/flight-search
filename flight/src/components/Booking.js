import React from "react";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const { appData } = useAppContext();
  const selectedCity = appData.selectedCity;
  console.log(selectedCity);

  return (
    <div>
      <h2>Booking Page</h2>
      <p>From: {selectedCity.nereden}</p>
      <p>To: {selectedCity.nereye}</p>
    </div>
  );
};

export default Booking;
