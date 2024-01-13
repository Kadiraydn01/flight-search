import React, { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiLoader3Line } from "react-icons/ri";
import data from "../mock/data";
import { useAppContext } from "../context/AppContext";
import DatePicker from "react-datepicker";
import Slider from "react-slick";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Homepage = () => {
  const { setContextData } = useAppContext();
  const [giseSecimi, setGiseSecimi] = useState("tekGidis");
  const [biletVerisi, setBiletVerisi] = useState({
    giseSecimi: "tekGidis",
    nereden: "",
    nereye: "",
    gidisTarihi: null,
    donusTarihi: null,
  });

  const sliderImages = [
    "https://images.pexels.com/photos/258117/pexels-photo-258117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/2880504/pexels-photo-2880504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/",
    "https://images.pexels.com/photos/163802/venice-cruise-mediterranean-architecture-163802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1258865/pexels-photo-1258865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000, // Rotate every 2 seconds
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [neredenMenu, setNeredenMenu] = useState(false);
  const [nereyeMenu, setNereyeMenu] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [dateError, setDateError] = useState({
    gidisTarihi: "",
    donusTarihi: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Bilet Ara");

  const navigate = useNavigate();
  let sliderRef = React.createRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      sliderRef && sliderRef.slickNext();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sliderRef]);

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

    if (field === "gidisTarihi") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const selectedDate = new Date(date);

      if (selectedDate < yesterday) {
        setDateError({
          ...dateError,
          gidisTarihi: "Geçersiz tarih!",
        });
      } else {
        setDateError({
          ...dateError,
          gidisTarihi: "",
        });
      }
    }

    if (field === "donusTarihi") {
      const departureDate = new Date(biletVerisi.gidisTarihi);
      const selectedReturnDate = new Date(date);

      if (selectedReturnDate < departureDate) {
        setDateError({
          ...dateError,
          donusTarihi: "Dönüş tarihi, gidiş tarihinden önce olamaz.",
        });
      } else {
        setDateError({
          ...dateError,
          donusTarihi: "",
        });
      }
    }
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
    if (field === "nereden" && city === biletVerisi.nereye) {
      return;
    }

    if (field === "nereye" && city === biletVerisi.nereden) {
      return;
    }

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
    setLoading(true);
    setLoadingText("Yükleniyor...");

    setTimeout(async () => {
      const cityData = {
        nereden: biletVerisi.nereden,
        nereye: biletVerisi.nereye,
        gidisTarihi: biletVerisi.gidisTarihi,
        donusTarihi: biletVerisi.donusTarihi,
        giseSecimi: biletVerisi.giseSecimi,
      };

      await setContextData({ selectedCity: cityData });
      setLoading(false);
      setLoadingText("Bilet Ara");
      navigate("/booking");
    }, 3000);
  };

  const filteredCities = data.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const isButtonDisabled =
    !biletVerisi.nereden ||
    !biletVerisi.nereye ||
    !biletVerisi.gidisTarihi ||
    (biletVerisi.giseSecimi === "gidisDonus" && !biletVerisi.donusTarihi);

  return (
    <div className="overflow-hidden">
      <div className="mt-12">
        <Slider ref={(slider) => (sliderRef = slider)} {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <div key={index}>
              <img
                className="min-h-[300px] sm:max-h-[500px] min-w-full"
                src={image}
                alt={`Slider ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="form-container bg-white shadow-lg mt-4 p-8">
        <div className="flex ml-16 mt-2">
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
        <div className="flex flex-col sm:flex-row items-start sm:h-[400px] justify-around gap-6 border mt-4 mx-auto">
          <div className="flex mx-auto mt-20 gap-4 overflow-x-hidden max-w-[800px]">
            <div className="flex flex-col gap-4 sm:mt-20 px-2 sm:px-16 text-center">
              <label className="font-light">Nereden</label>
              <label
                className={`cursor-pointer ${neredenMenu && "bg-blue-200 "}`}
                onClick={() => handleMenuClick("nereden")}
              >
                {biletVerisi.nereden
                  ? biletVerisi.nereden.split("-")[0].trim()
                  : "_______________"}
              </label>
              {neredenMenu && (
                <div className="city-list-container">
                  <input
                    type="text"
                    placeholder="Şehir Ara"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="border border-gray-300 rounded mt-1 px-2 py-1"
                  />
                  <ul className="border border-gray-300 bg-slate-400  rounded mt-1 max-h-40 overflow-y-auto city-list">
                    {filteredCities.map((city) => (
                      <li
                        key={city}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          biletVerisi.nereden === city &&
                          "bg-gray-300 text-white"
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
            <div className="flex border max-h-12 bg-gray-300 max-w-12 rounded-full sm:hidden sm:flex-row justify-center items-center">
              <FaExchangeAlt
                className="cursor-pointer text-xl mx-4"
                onClick={() => handleExchangeClick()}
              />
            </div>
            <div className="flex flex-col gap-4 sm:mt-20 px-2 sm:px-16 text-center">
              <label className="font-light">Nereye</label>
              <label
                className={`cursor-pointer ${nereyeMenu && "bg-blue-200"}`}
                onClick={() => handleMenuClick("nereye")}
              >
                {biletVerisi.nereye
                  ? biletVerisi.nereye.split("-")[0].trim()
                  : "_______________"}
              </label>
              {nereyeMenu && (
                <div className="city-list-container">
                  <input
                    type="text"
                    placeholder="Şehir Ara"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="border border-gray-300 rounded mt-1 px-2 py-1"
                  />
                  <ul className="border border-gray-300 bg-slate-500 rounded mt-1 max-h-40 overflow-y-auto city-list">
                    {filteredCities.map((city) => (
                      <li
                        key={city}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          biletVerisi.nereye === city &&
                          "bg-gray-300 text-white"
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

          <div className="flex flex-col mx-auto gap-4 sm:gap-6 mt-2 sm:my-auto px-2 sm:px-16">
            <label className="text-center items-center">Gidiş Tarihi:</label>
            <DatePicker
              className="items-center border text-center"
              selected={biletVerisi.gidisTarihi}
              onChange={(date) => handleDateChange(date, "gidisTarihi")}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />

            {dateError.gidisTarihi && (
              <p className="text-red-500">{dateError.gidisTarihi}</p>
            )}
          </div>

          <div className="flex flex-col mx-auto gap-4 sm:gap-6 mt-2 sm:my-auto px-2 sm:px-16">
            <label className="text-center items-center">Dönüş Tarihi:</label>
            <DatePicker
              className="items-center text-center"
              selected={biletVerisi.donusTarihi}
              onChange={(date) => handleDateChange(date, "donusTarihi")}
              dateFormat="dd/MM/yyyy"
              minDate={biletVerisi.gidisTarihi || new Date()}
              disabled={giseSecimi === "tekGidis"}
            />
            {dateError.donusTarihi && (
              <p className="text-red-500">{dateError.donusTarihi}</p>
            )}
          </div>
          <div className="mt-4 mx-auto sm:my-auto">
            <button
              className={`bg-orange-500 text-white px-10 sm:px-20 py-2 rounded mt-2 cursor-pointer ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleBooking}
              disabled={isButtonDisabled}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RiLoader3Line className="animate-spin text-white mr-2" />
                  {loadingText}
                </div>
              ) : (
                loadingText
              )}
            </button>
            {isButtonDisabled}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
