import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import data from "../mock/data";
import { useAppContext } from "../context/AppContext";

const Homepage = () => {
  const { setContextData } = useAppContext();
  const { handleSubmit, control, setValue, register, watch, formState } =
    useForm({
      defaultValues: {
        giseSecimi: "tekGidis",
        nereden: "",
        nereye: "",
        gidisTarihi: null,
        donusTarihi: null,
      },
    });
  const navigate = useNavigate();
  const [neredenMenu, setNeredenMenu] = useState(false);
  const [nereyeMenu, setNereyeMenu] = useState(false);
  const [citySearch, setCitySearch] = useState("");

  const giseSecimi = watch("giseSecimi", "tekGidis");

  const handleExchangeClick = () => {
    const nereden = watch("nereden");
    const nereye = watch("nereye");

    setValue("nereden", nereye);
    setValue("nereye", nereden);
  };

  const onSubmit = (data) => {
    const cityData = {
      nereden: data.nereden,
      nereye: data.nereye,
      gidisTarihi: data.gidisTarihi,
      donusTarihi: data.giseSecimi === "gidisDonus" ? data.donusTarihi : null,
      giseSecimi: data.giseSecimi,
    };

    setContextData({ selectedCity: cityData });
    navigate("/booking");
  };

  const filteredCities = data.filter((city) =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex ml-10 mt-12 ">
          <label
            className={`bg-blue-500 px-4 py-2 rounded-l cursor-pointer ${
              giseSecimi === "tekGidis"
                ? "text-white bg-blue-500"
                : "text-gray-500 bg-gray-300"
            }`}
            onClick={() => setValue("giseSecimi", "tekGidis")}
          >
            Tek Gidiş
          </label>
          <label
            className={`bg-blue-500 px-4 py-2 rounded-r cursor-pointer ${
              giseSecimi === "gidisDonus"
                ? "text-white bg-blue-500"
                : "text-gray-500 bg-gray-300"
            }`}
            onClick={() => setValue("giseSecimi", "gidisDonus")}
          >
            Gidiş-Dönüş
          </label>
        </div>
        <div className="flex items-start h-[400px] justify-around gap-6 border mt-4">
          <div className="flex mt-20 gap-4 overflow-x-hidden max-w-[800px]">
            <div className="flex flex-col gap-4  px-16 text-center">
              <label className="font-light">Nereden</label>
              <label
                className={`cursor-pointer ${neredenMenu && "bg-blue-200"}`}
                onClick={() => setNeredenMenu(!neredenMenu)}
              >
                {watch("nereden")
                  ? watch("nereden").split("-")[0].trim()
                  : "_______________"}
              </label>
              {neredenMenu && (
                <div className="city-list-container">
                  <input
                    type="text"
                    placeholder="Şehir Ara"
                    {...register("citySearch")}
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="border border-gray-300 rounded mt-1 px-2 py-1"
                  />
                  <ul className="border border-gray-300 bg-slate-400 max-w-[200px] rounded mt-1 max-h-40 overflow-y-auto city-list">
                    {filteredCities.map((city) => (
                      <li
                        key={city}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          watch("nereden") === city && "bg-gray-300 text-white"
                        }`}
                        onClick={() => setValue("nereden", city)}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {formState.errors.nereden && (
                <p className="text-red-500 text-sm">
                  Nereden seçimi zorunludur.
                </p>
              )}
            </div>
            <div className="flex border max-h-12 bg-gray-300 max-w-12 rounded-full flex-row justify-center items-center">
              <FaExchangeAlt
                className="cursor-pointer text-xl mx-4"
                onClick={handleExchangeClick}
              />
            </div>
            <div className="flex flex-col gap-4  px-16 text-center">
              <label className="font-light">Nereye</label>
              <label
                className={`cursor-pointer ${nereyeMenu && "bg-blue-200"}`}
                onClick={() => setNereyeMenu(!nereyeMenu)}
              >
                {watch("nereye")
                  ? watch("nereye").split("-")[0].trim()
                  : "_______________"}
              </label>
              {nereyeMenu && (
                <div className="city-list-container">
                  <input
                    type="text"
                    placeholder="Şehir Ara"
                    {...register("citySearch")}
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="border border-gray-300 rounded mt-1 px-2 py-1"
                  />
                  <ul className="border border-gray-300 bg-slate-400 rounded mt-1 max-h-40 overflow-y-auto city-list">
                    {filteredCities.map((city) => (
                      <li
                        key={city}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          watch("nereye") === city && "bg-gray-300 text-white"
                        }`}
                        onClick={() => setValue("nereye", city)}
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {formState.errors.nereye && (
                <p className="text-red-500 text-sm">
                  Nereye seçimi zorunludur.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col mt-20 px-5">
            <label className="text-center items-center">Gidiş Tarihi:</label>
            <Controller
              control={control}
              name="gidisTarihi"
              rules={{
                required: "Bu alan zorunludur.",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();

                  return selectedDate >= currentDate
                    ? true
                    : "Geçmiş bir tarih seçilemez.";
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    type="date"
                    {...field}
                    className="border border-gray-300 rounded mt-1 px-2 py-1"
                  />
                  {formState.errors.gidisTarihi && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.gidisTarihi.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="flex flex-col mt-20 px-5 ">
            <label className="text-center items-center">Dönüş Tarihi:</label>
            <Controller
              control={control}
              name="donusTarihi"
              rules={{
                required:
                  giseSecimi === "gidisDonus"
                    ? "Bu alan zorunludur."
                    : undefined,
              }}
              render={({ field }) => (
                <>
                  <input
                    type="date"
                    {...field}
                    disabled={giseSecimi === "tekGidis"}
                    className="border border-gray-300 rounded mt-1 px-2 py-1"
                  />
                  {formState.errors.donusTarihi && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.donusTarihi.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="mt-20">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
            >
              Bilet Ara
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Homepage;
