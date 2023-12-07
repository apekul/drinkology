import React from "react";
import Navbar from "./Navbar";
import heroBG from "../Assets/IMG/heroBG.jpg";
import Vector from "../Assets/IMG/Vector.svg";
import VectorBG from "../Assets/IMG/VectorBG.svg";
import dBlue from "../Assets/IMG/dBlue.svg";
import dRed from "../Assets/IMG/dRed.svg";
import dYellow from "../Assets/IMG/dYellow.svg";

const Hero = () => {
  return (
    <section
      id="hero"
      style={{ backgroundImage: `url(${heroBG})` }}
      className="bg-cover bg-center"
    >
      <div className="bg-gradient-to-r h-auto sm:h-[35rem] lg:h-[30rem] from-black from-60% lg:from-15% relative">
        <Navbar />
        <div className="Container flex flex-col lg:flex-row h-full items-center lg:items-start lg:justify-between ">
          <span className="text-white w-full lg:w-1/2 my-10 flex flex-col">
            <h1 className="font-bold text-3xl">
              Find the perfect beverage for any occasion
            </h1>
            <p className="text-xl">
              Discover a comprehensive database for drinks and cocktails,
              featuring a wide range of recipes, ingredients, and mixing
              instructions. Explore the world of beverages to create your
              perfect drink or cocktail. Cheers!
            </p>
          </span>
          <div className="DrinksHero relative w-full lg:w-2/3 h-[20rem] sm:h-[18rem] md:h-[19.5rem] lg:h-5/6 overflow-hidden ">
            <img
              src={dYellow}
              alt="dBlue"
              className="absolute top-[0rem] right-[8rem] sm:right-[12rem] w-52 sm:w-auto"
            />
            <img
              src={dRed}
              alt="dBlue"
              className="absolute top-[2.5rem] right-[4rem] sm:right-[6rem] w-52 sm:w-auto"
            />
            <img
              src={dBlue}
              alt="dBlue"
              className="absolute top-[4rem] -right-[1.1rem] sm:right-0 w-52 sm:w-auto"
            />
          </div>
        </div>
        {/* Waves */}
        <img
          src={VectorBG}
          alt="VectorWave2"
          className="absolute -bottom-1 w-full"
        />
        <img
          src={Vector}
          alt="VectorWave"
          className="absolute -bottom-1 w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
