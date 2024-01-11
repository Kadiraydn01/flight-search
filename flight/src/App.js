import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import About from "./components/About";
import Contact from "./components/Contact";
import Offer from "./components/Offer";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Booking from "./components/Booking";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/service" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/booking" element={<Booking />} />

          <Route
            path="*"
            element={<h1 className="Font-bold text-4xl">Sayfa Bulunamadı</h1>}
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
