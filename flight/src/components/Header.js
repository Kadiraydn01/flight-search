import React from "react";
import { IoMdSearch } from "react-icons/io";

const Header = () => {
  return (
    <>
      <div className="flex gap-6 items-center justify-between">
        <div className="p-6 font-bold text-2xl text-red-600">FlightSrc</div>
        <div>
          <ul className="flex justify-center gap-8 cursor-pointer">
            <a href="/">ANASAYFA</a>
            <a href="/about">HAKKIMIZDA</a>
            <a href="/contact">İLETİŞİM</a>
            <a href="/offer">KAMPANYALAR</a>
            <a href="/service">HİZMETLER</a>
            <a href="/blog">BLOG</a>
          </ul>
        </div>
        <div className="flex gap-2 px-6">
          <IoMdSearch className="text-2xl" />
          <input placeholder="Ara" className="border" type="text" />
        </div>
      </div>
    </>
  );
};

export default Header;
