import React from "react";
import logo from "../Assets/IMG/Logo.png";
const Navbar = () => {
  return (
    <section id="navbar" className="Container">
      <div className="py-3 text-white font-bold">
        <span className="flex items-center">
          <img src={logo} alt="" className="w-8" />
          <p>DRINKOLOGY</p>
        </span>
      </div>
    </section>
  );
};

export default Navbar;
