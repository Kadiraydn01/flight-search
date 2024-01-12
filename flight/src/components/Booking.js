import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";
import flightData from "../mock/flightData";
import { Ri24HoursLine } from "react-icons/ri";
import { PiFlowArrowFill } from "react-icons/pi";

import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const { appData } = useAppContext();
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const selectedCity = appData.selectedCity;

  const handleReturnDateChange = (date) => {
    setSelectedReturnDate(date);
  };

  const renderSeferBilgileri = (seferData) => {
    return seferData.map((sefer) => (
      <div key={sefer.departureTime} className="flex border p-5 cursor-pointer">
        <div className="flex text-center items-center justify-around w-full gap-5 text-xl">
          <div>
            <p>Kalkış</p>
            <p className="font-bold text-2xl"> {sefer.departureTime}</p>
          </div>
          <div className="items-center flex flex-col gap-2 text-gray-400">
            <p>Tek Aktarma 3 sa</p>
            <PiFlowArrowFill />
          </div>

          <div>
            <p>Varış</p>
            <p className="font-bold text-2xl"> {sefer.landingTime}</p>
          </div>

          <Ri24HoursLine className="text-green-400 text-2xl" />
          <p className="font-bold text-2xl">{sefer.price}₺</p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="w-4/5 mt-6 ml-36 border shadow-xl rounded-xl">
        <div className="flex flex-col gap-6 mt-3 mb-16 mx-6 ">
          <div className="flex text-center items-center gap-5 text-xl ">
            <IoAirplane className="p-3 border border-orange-600 text-orange-600 rounded-full w-14 h-14" />
            <p>{selectedCity.nereden}</p>
            <FaLongArrowAltRight className="text-3xl text-orange-600" />
            <p>{selectedCity.nereye}</p>
          </div>
          <div className="flex gap-5 justify-center">
            {[...Array(3)].map((_, index) => {
              const returnDate = new Date(selectedCity.gidisTarihi);
              returnDate.setDate(returnDate.getDate() + index - 1);

              const formattedDate = returnDate.toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <button
                  key={formattedDate}
                  onClick={() => handleReturnDateChange(returnDate)}
                  className={`px-32 py-5 rounded ${
                    returnDate.toISOString() ===
                    selectedReturnDate?.toISOString()
                      ? "bg-orange-600 text-white"
                      : "bg-orange-300 text-white"
                  }`}
                >
                  {formattedDate}
                </button>
              );
            })}
          </div>
          {renderSeferBilgileri(flightData.gidis)}
        </div>

        <div className="flex gap-6 my-6 mx-6">
          <Ri24HoursLine className="text-green-400 text-xl" />
          <p>24 saat içinde ücretsiz iptal hakkı</p>
        </div>
        <div className="flex flex-col gap-6 mt-3 mb-16 mx-6 ">
          <div className="flex text-center items-center gap-5 text-xl ">
            <IoAirplane className="p-3 border border-orange-600 text-orange-600 rounded-full w-14 h-14" />
            <p>{selectedCity.nereye}</p>
            <FaLongArrowAltRight className="text-3xl text-orange-600" />
            <p>{selectedCity.nereden}</p>
          </div>
          <div>
            <div className="flex gap-5 justify-center">
              {[...Array(3)].map((_, index) => {
                const returnDate = new Date(selectedCity.donusTarihi);
                returnDate.setDate(returnDate.getDate() + index - 1);

                const formattedDate = returnDate.toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <button
                    key={formattedDate}
                    onClick={() => handleReturnDateChange(returnDate)}
                    className={`px-32 py-5 rounded ${
                      returnDate.toISOString() ===
                      selectedReturnDate?.toISOString()
                        ? "bg-orange-600 text-white"
                        : "bg-orange-300 text-white"
                    }`}
                  >
                    {formattedDate}
                  </button>
                );
              })}
            </div>
          </div>
          {renderSeferBilgileri(flightData.donus)}
        </div>
      </div>
    </>
  );
};

export default Booking;
