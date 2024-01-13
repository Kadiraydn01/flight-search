import React from "react";
import { IoMdSearch } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
        <div className="p-6 font-bold text-2xl text-red-600">FlightSrc</div>
        <div className="flex flex-col sm:flex-row sm:flex-grow justify-center sm:justify-end">
          <ul className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 sm:gap-8 cursor-pointer sm:mt-0">
            <a href="/">ANASAYFA</a>
            <a href="/about">HAKKIMIZDA</a>
            <a href="/contact">İLETİŞİM</a>
            <a href="/offer">KAMPANYALAR</a>
            <a href="/service">HİZMETLER</a>
            <a href="/blog">BLOG</a>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 px-6 mt-4 sm:mt-0">
          <IoMdSearch className="text-2xl" />
          <input placeholder="Ara" className="border" type="text" />
        </div>
      </div>
    </>
  );
};

export default Header;
