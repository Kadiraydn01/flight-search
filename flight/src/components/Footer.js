import React from "react";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row bg-custom-gray items-start sm:h-20">
        <div className="flex flex-row items-center py-7 justify-between w-full sm:px-4">
          <div className="p-6 font-bold text-2xl text-red-600">FlightSrc</div>
          <div className="flex px-4 sm:px-0 gap-4">
            <BiLogoFacebookCircle className="text-blue-400 w-6 h-6" />
            <FaInstagram className="text-blue-400 w-6 h-6" />
            <BsTwitter className="text-blue-400 w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60">
        <div className="flex flex-col sm:flex-row gap-6 items-start py-10">
          <div className="list-none flex flex-col gap-4 py-2 sm:py-4">
            <div className="text-lg sm:text-xl font-bold">Company Info</div>
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </div>
          <div className="list-none flex flex-col gap-4 py-2 sm:py-4">
            <div className="text-lg sm:text-xl font-bold">Legal</div>
            <li>About Us</li>
            <li>Carrier</li>
            <li>We are hiring</li>
            <li>Blog</li>
          </div>
          <div className="list-none flex flex-col gap-4 py-2 sm:py-4">
            <div className="text-lg sm:text-xl font-bold">Features</div>
            <li>Business Marketing</li>
            <li>User Analytics</li>
            <li>Live Chat</li>
            <li>Unlimited Support</li>
          </div>
          <div className="list-none flex flex-col gap-4 py-2 sm:py-4">
            <div className="text-lg sm:text-xl font-bold">Resources</div>
            <li>IOS & Android</li>
            <li>Watch a Demo</li>
            <li>Customers</li>
            <li>API</li>
          </div>
          <div className="flex flex-col gap-4 py-2 sm:py-4">
            <div className="text-lg sm:text-xl font-bold">Get in Touch</div>
            <div>
              <Form.Control
                type="text"
                placeholder="Your E-mail"
                className="rounded-md py-2 sm:py-4 px-3 sm:px-5 border border-custom-button"
              />
              <Button
                variant="primary"
                className="mt-2 text-white bg-sky-400 py-2 sm:py-4 px-3 sm:px-4 rounded"
              >
                Subscribe
              </Button>
              <div>Lorem ipsum dolor</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-4 sm:px-10 md:px-20 lg:px-40 xl:px-60 bg-custom-gray">
        <div className="flex py-3 sm:py-6 flex-col items-start flex-shrink-0">
          <div className="text-xs sm:text-sm">
            Made With Love By Turkiye. All Right Reserved
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
