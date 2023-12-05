import React from "react";
import { BiSolidDrink } from "react-icons/bi";

const Navbar = () => {
  return (
    <section id="navbar" className="Container">
      <div className="py-3 text-white font-bold">
        <span className="flex items-center gap-2">
          <BiSolidDrink />
          <p>DRINKOLOGY</p>
        </span>
      </div>
    </section>
  );
};

export default Navbar;
