import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import data from "../mock/data";
import { useAppContext } from "../context/AppContext";

const Homepage = () => {
  const { appData, setContextData } = useAppContext();
  const [giseSecimi, setGiseSecimi] = useState("tekGidis");
  const [biletVerisi, setBiletVerisi] = useState({
    giseSecimi: "tekGidis",
    nereden: "",
    nereye: "",
    gidisTarihi: null,
    donusTarihi: null,
  });

  const [neredenMenu, setNeredenMenu] = useState(false);
  const [nereyeMenu, setNereyeMenu] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const navigate = useNavigate();

  const handleGiseSecimiChange = (value) => {
    setGiseSecimi(value);
    setBiletVerisi({
      ...biletVerisi,
      giseSecimi: value,
      donusTarihi: value === "tekGidis" ? null : biletVerisi.donusTarihi,
    });
  };

  const handleDateChange = (date, field) => {
    setBiletVerisi({
      ...biletVerisi,
      [field]: date,
    });
  };

  const handleExchangeClick = () => {
    const updatedBiletVerisi = {
      ...biletVerisi,
      nereden: biletVerisi.nereye,
      nereye: biletVerisi.nereden,
    };

    setBiletVerisi(updatedBiletVerisi);
  };

  const handleMenuClick = (field) => {
    if (field === "nereden") {
      setNeredenMenu(!neredenMenu);
      setNereyeMenu(false);
    } else if (field === "nereye") {
      setNereyeMenu(!nereyeMenu);
      setNeredenMenu(false);
    }
  };

  const handleCitySelect = (city, field) => {
    setBiletVerisi({
      ...biletVerisi,
      [field]: city,
    });
    if (field === "nereden") {
      setNeredenMenu(false);
    } else if (field === "nereye") {
      setNereyeMenu(false);
    }
  };

  const handleBooking = async () => {
    const cityData = {
      nereden: biletVerisi.nereden,
      nereye: biletVerisi.nereye,
    };

    await setContextData({ selectedCity: cityData });
    navigate("/booking");
  };

  useEffect(() => {
    if (appData.selectedCity) {
      navigate("/booking");
    }
  }, [appData.selectedCity, navigate]);

  const filteredCities = data.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div>
      <div className="flex ml-10 mt-12 overflow-hidden">
        <label
          className={`bg-blue-500 px-4 py-2 rounded-l cursor-pointer ${
            giseSecimi === "tekGidis"
              ? "text-white bg-blue-500"
              : "text-gray-500 bg-gray-300"
          }`}
          onClick={() => handleGiseSecimiChange("tekGidis")}
        >
          Tek Gidiş
        </label>
        <label
          className={`bg-blue-500 px-4 py-2 rounded-r cursor-pointer ${
            giseSecimi === "gidisDonus"
              ? "text-white bg-blue-500"
              : "text-gray-500 bg-gray-300"
          }`}
          onClick={() => handleGiseSecimiChange("gidisDonus")}
        >
          Gidiş-Dönüş
        </label>
      </div>
      <div className="flex items-start h-[350px] justify-around gap-6 border mt-4">
        <div className="flex mt-20 gap-4">
          <div className="flex flex-col  px-16 text-center">
            <label className="bg-slate-100">Nereden</label>
            <label
              className={`cursor-pointer border ${
                neredenMenu && "bg-blue-200"
              }`}
              onClick={() => handleMenuClick("nereden")}
            >
              {biletVerisi.nereden
                ? biletVerisi.nereden.split("-")[0].trim()
                : "Şehir Seçin"}
            </label>
            {neredenMenu && (
              <div>
                <input
                  type="text"
                  placeholder="Şehir Ara"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="border border-gray-300 rounded mt-1 px-2 py-1"
                />
                <ul className="border border-gray-300 rounded mt-1">
                  {filteredCities.slice(0, 5).map((city) => (
                    <li
                      key={city}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        biletVerisi.nereden === city && "bg-gray-300 text-white"
                      }`}
                      onClick={() => handleCitySelect(city, "nereden")}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex border rounded-full flex-row justify-center items-center">
            <FaExchangeAlt
              className="cursor-pointer text-xl mx-4"
              onClick={() => handleExchangeClick()}
            />
          </div>
          <div className="flex flex-col  px-16 text-center">
            <label className="bg-slate-100">Nereye</label>
            <label
              className={`cursor-pointer ${nereyeMenu && "bg-blue-200"}`}
              onClick={() => handleMenuClick("nereye")}
            >
              {biletVerisi.nereye
                ? biletVerisi.nereye.split("-")[0].trim()
                : "Şehir Seçiniz"}
            </label>
            {nereyeMenu && (
              <div>
                <input
                  type="text"
                  placeholder="Şehir Ara"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="border border-gray-300 rounded mt-1 px-2 py-1"
                />
                <ul className="border border-gray-300 rounded mt-1">
                  {filteredCities.slice(0, 5).map((city) => (
                    <li
                      key={city}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        biletVerisi.nereye === city && "bg-gray-300 text-white"
                      }`}
                      onClick={() => handleCitySelect(city, "nereye")}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-20 border px-5">
          <label className="text-center items-center">Gidiş Tarihi:</label>
          <input
            type="date"
            value={biletVerisi.gidisTarihi}
            onChange={(e) => handleDateChange(e.target.value, "gidisTarihi")}
          />
        </div>
        <div className="flex flex-col mt-20 border px-5 ">
          <label className="text-center items-center">Dönüş Tarihi:</label>
          <input
            type="date"
            value={biletVerisi.donusTarihi || ""}
            onChange={(e) => handleDateChange(e.target.value, "donusTarihi")}
            disabled={giseSecimi === "tekGidis"}
          />
        </div>
        <div className="mt-20">
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
            onClick={handleBooking}
          >
            Bilet Ara
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
