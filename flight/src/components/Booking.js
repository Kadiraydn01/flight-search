import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";
import { Ri24HoursLine } from "react-icons/ri";
import { CgArrowLongRightC } from "react-icons/cg";
import flightData from "../mock/flightData";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const { appData } = useAppContext();
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [selectedFlightDetails, setSelectedFlightDetails] = useState(null);
  const selectedCity = appData.selectedCity;
  const [selectedDepartureTimeFilter, setSelectedDepartureTimeFilter] =
    useState(null);
  const [selectedReturnTimeFilter, setSelectedReturnTimeFilter] =
    useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleReturnDateChange = (date) => {
    setSelectedReturnDate(date);
  };

  const handleFlightDetails = (flight) => {
    setSelectedFlightDetails(flight);
  };

  const filterFlightsByTime = (flights, startTime, endTime) => {
    return flights.filter(
      (flight) =>
        flight.departureTime >= startTime && flight.departureTime <= endTime
    );
  };

  const getDayOfWeek = (date) => {
    const days = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];
    const dayIndex = date.getDay();
    return days[dayIndex];
  };

  const sortFlights = (flights) => {
    return flights.slice().sort((a, b) => {
      if (sortOrder === "cheapToExpensive") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOrder === "expensiveToCheap") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else {
        return a.departureTime.localeCompare(b.departureTime);
      }
    });
  };

  const renderSeferBilgileri = (seferData) => {
    let filteredFlights = seferData;
    let selectedTimeFilter = null;

    if (seferData === flightData.gidis) {
      selectedTimeFilter = selectedDepartureTimeFilter;
    } else if (seferData === flightData.donus) {
      selectedTimeFilter = selectedReturnTimeFilter;
    }

    if (selectedTimeFilter) {
      const [startTime, endTime] = selectedTimeFilter.split("-");
      filteredFlights = filterFlightsByTime(seferData, startTime, endTime);
    }

    const sortedFlights = sortFlights(filteredFlights);
    if (sortedFlights.length === 0) {
      return (
        <div className="text-center font-light text-2xl text-red-500 mt-4">
          Uçuş bulunamadı :(
        </div>
      );
    }

    return sortedFlights.map((sefer) => (
      <div
        key={sefer.departureTime}
        className="flex border shadow-lg my-6 mx-auto  bg-green-100 hover:bg-green-300 py-4 px-8 max-w-[1000px] cursor-pointer"
        onClick={() => handleFlightDetails(sefer)}
      >
        <div className="flex text-center items-center justify-around w-full gap-5 text-xl">
          <div>
            <p>Kalkış</p>
            <p className="font-bold text-2xl"> {sefer.departureTime}</p>
          </div>
          <div className="items-center flex flex-col gap-2 text-gray-400">
            <p>Direkt Uçuş</p>
            <CgArrowLongRightC className="text-3xl" />
            <p> 3 saat</p>
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

  const timeFilterOptions = [
    { label: "00:00-11:00", value: "07-11" },
    { label: "11:00-15:00", value: "12-16" },
    { label: "15:00-19:00", value: "16-19" },
    { label: "19:01-23:59", value: "19-23" },
  ];

  const sortOptions = [
    { label: "Ucuzdan Pahalıya", value: "cheapToExpensive" },
    { label: "Pahalıdan Ucuza", value: "expensiveToCheap" },
  ];

  const renderDateButtons = (startDate, numDays) => {
    return [...Array(numDays)].map((_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);

      const formattedDate = date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const dayOfWeek = getDayOfWeek(date);

      return (
        <div key={formattedDate} className="text-center">
          <button
            onClick={() => handleReturnDateChange(date)}
            className={`px-32 py-5 rounded ${
              date.toISOString() === selectedReturnDate?.toISOString()
                ? "bg-orange-600 text-white"
                : "bg-orange-300 text-white"
            }`}
          >
            {formattedDate}
            <p className="text-black">{dayOfWeek}</p>
          </button>
        </div>
      );
    });
  };

  const handleSortToggle = (value) => {
    if (sortOrder === value) {
      setSortOrder(null);
    } else {
      setSortOrder(value);
      setSelectedDepartureTimeFilter(null);
      setSelectedReturnTimeFilter(null);
    }
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
            {renderDateButtons(selectedCity.gidisTarihi, 3)}
          </div>
          <div className="flex gap-12 justify-around">
            <div className="flex gap-5 justify-center">
              {timeFilterOptions.map((timeFilter) => (
                <button
                  key={timeFilter.value}
                  onClick={() => {
                    if (selectedDepartureTimeFilter === timeFilter.value) {
                      setSelectedDepartureTimeFilter(null);
                    } else {
                      setSelectedDepartureTimeFilter(timeFilter.value);
                      setSortOrder(null);
                    }
                  }}
                  className={`px-8 py-4 rounded ${
                    selectedDepartureTimeFilter === timeFilter.value
                      ? "bg-indigo-500 text-white"
                      : "bg-indigo-300 text-white"
                  }`}
                >
                  {timeFilter.label}
                </button>
              ))}
            </div>
            <div className="flex gap-5 justify-center">
              {sortOptions.map((sortOption) => (
                <button
                  key={sortOption.value}
                  onClick={() => handleSortToggle(sortOption.value)}
                  className={`px-4 py-4 rounded ${
                    sortOrder === sortOption.value
                      ? "bg-slate-500 text-white"
                      : "bg-slate-400 text-white"
                  }`}
                >
                  {sortOption.label}
                </button>
              ))}
            </div>
          </div>
          <div>{renderSeferBilgileri(flightData.gidis)}</div>
        </div>

        <div className="flex gap-6 my-6 mx-6">
          <Ri24HoursLine className="text-green-400 text-xl" />
          <p>24 saat içinde ücretsiz iptal hakkı</p>
        </div>

        {selectedCity.donusTarihi && (
          <div className="flex flex-col gap-6 mt-3 mb-16 mx-6">
            <div className="flex text-center items-center gap-5 text-xl">
              <IoAirplane className="p-3 border border-orange-600 text-orange-600 rounded-full w-14 h-14" />
              <p>{selectedCity.nereye}</p>
              <FaLongArrowAltRight className="text-3xl text-orange-600" />
              <p>{selectedCity.nereden}</p>
            </div>
            <div className="flex gap-5 justify-center">
              {renderDateButtons(selectedCity.donusTarihi, 3)}
            </div>
            <div className="flex gap-12 justify-around">
              <div className="flex gap-5 justify-center">
                {timeFilterOptions.map((timeFilter) => (
                  <button
                    key={timeFilter.value}
                    onClick={() => {
                      if (selectedReturnTimeFilter === timeFilter.value) {
                        setSelectedReturnTimeFilter(null);
                      } else {
                        setSelectedReturnTimeFilter(timeFilter.value);
                        setSortOrder(null);
                      }
                    }}
                    className={`px-8 py-4 rounded ${
                      selectedReturnTimeFilter === timeFilter.value
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-300 text-white"
                    }`}
                  >
                    {timeFilter.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-5 justify-center">
                {sortOptions.map((sortOption) => (
                  <button
                    key={sortOption.value}
                    onClick={() => handleSortToggle(sortOption.value)}
                    className={`px-5 py-5 rounded ${
                      sortOrder === sortOption.value
                        ? "bg-slate-600 text-white"
                        : "bg-slate-300 text-white"
                    }`}
                  >
                    {sortOption.label}
                  </button>
                ))}
              </div>
            </div>

            <div>{renderSeferBilgileri(flightData.donus)}</div>
          </div>
        )}

        {selectedFlightDetails && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-neutral-100 flex flex-col gap-4 items-stretch w-[400px] text-center p-12 rounded-xl">
              <div className="flex justify-between border bg-slate-200 border-black rounded-xl px-5 py-2">
                <p>Nereden:</p>
                <p> {selectedCity.nereden}</p>
              </div>
              <div className="flex justify-between border bg-slate-200 border-black rounded-xl px-5 py-2">
                <p>Nereye:</p>
                <p>{selectedCity.nereye}</p>
              </div>
              <div className="flex justify-between border bg-slate-200 border-black rounded-xl px-5 py-2">
                <p>Kalkış Saati:</p>
                <p>{selectedFlightDetails.departureTime}</p>
              </div>
              <div className="flex justify-between border bg-slate-200 border-black rounded-xl px-5 py-2">
                <p>Varış Saati:</p>
                <p>{selectedFlightDetails.landingTime}</p>
              </div>
              <div className="flex justify-between border bg-slate-200 border-black rounded-xl px-5 py-2">
                <p>Ücret:</p>
                <p>{selectedFlightDetails.price}₺</p>
              </div>

              <button
                className="bg-red-400 rounded-xl py-[12px] hover:bg-red-600 ml-24 mt-3 w-[110px]"
                onClick={() => setSelectedFlightDetails(null)}
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Booking;
