import React from "react";
import DisplayItem from "./DisplayItem";

const RandomDrink = ({ randomDrink, setRandomDrink }) => {
  return (
    <div id="randomDrink">
      {randomDrink && (
        <div className={`flex flex-col gap-5 border-b-2 pb-5`}>
          <p className="font-bold">Random Drink</p>
          <DisplayItem
            item={randomDrink}
            bg="bg-indigo-100"
            setRandomDrink={setRandomDrink}
          />
        </div>
      )}
    </div>
  );
};

export default RandomDrink;
