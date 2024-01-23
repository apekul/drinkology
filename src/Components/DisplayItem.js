import React, { useEffect, useState } from "react";
import { tagColors } from "../Object";
import { IoClose } from "react-icons/io5";

const DisplayItem = ({ item, bg, setRandomDrink }) => {
  const [newItem, setNewItem] = useState(item);
  const fetchByID = async (id) => {
    let link = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

    let byIdResult = await fetch(`https://${link}${id}`)
      .then((response) => response.json())
      .then((response) => response.drinks[0]);
    return setNewItem(byIdResult);
  };

  useEffect(() => {
    item.strIngredient1 === undefined && fetchByID(item.idDrink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <li
      className={`relative grid grid-cols-3 grid-flow-row auto-rows-max lg:flex w-full gap-3 rounded-md p-3 shadow h-fit lg:h-[20rem] ${bg}`}
    >
      <img
        src={newItem.strDrinkThumb}
        alt={newItem.strDrink}
        className="w-full sm:w-[20rem] h-auto rounded-md col-span-3 sm:col-span-1"
      />
      {setRandomDrink && (
        <IoClose
          onClick={() => setRandomDrink(null)}
          className="absolute right-1 text-2xl top-1 cursor-pointer text-gray-400 hover:text-black"
        />
      )}
      {/* Ingredients */}
      <ul className="flex flex-col w-full flex-wrap max:h-[10rem] gap-2 overflow-x-auto sm:col-start-2 col-span-3 sm:row-start-1 ">
        {Object.keys(newItem).map(
          (v, i) =>
            v.includes("strIngredient") &&
            newItem[v] !== null &&
            newItem[v].length !== 0 && (
              <li
                key={i}
                className="flex text-center items-center gap-2 h-auto"
              >
                <img
                  src={`https://www.thecocktaildb.com/images/ingredients/${newItem[v]}-Medium.png`}
                  alt={newItem.strIngredient1}
                  className="w-[2rem] h-[2rem]"
                />
                <span className="flex gap-2 whitespace-nowrap">
                  <p>{newItem["strMeasure" + v.replace(/\D/g, "")]}</p>
                  <p className="font-bold">{newItem[v]}</p>
                </span>
              </li>
            )
        )}
      </ul>
      <div className="flex flex-col justify-between w-full h-fit lg:h-full col-span-3 rows-start-3 ">
        <span className="flex flex-col gap-2">
          <p className="font-bold text-2xl">{newItem.strDrink}</p>
          <p className="max-h-[11rem] overflow-y-auto">
            {newItem.strInstructions}
          </p>
        </span>
        {/* tags */}
        <span className="flex items-end flex-wrap gap-2 pt-2 overflow-y-auto">
          <p
            className={`py-1 font-bold px-2 rounded-md cursor-pointer ${tagColors[0]} hover:brightness-105`}
          >
            {newItem.strAlcoholic}
          </p>
          <p
            className={`py-1 font-bold px-2 rounded-md cursor-pointer ${tagColors[1]} hover:brightness-105`}
          >
            {newItem.strCategory}
          </p>
          <p
            className={`py-1 font-bold px-2 rounded-md cursor-pointer ${tagColors[2]} hover:brightness-105`}
          >
            {newItem.strGlass}
          </p>
          {newItem.strTags?.split(",").map((tag, i) => (
            <p
              key={i}
              className={`py-1 font-bold px-2 rounded-md cursor-pointer ${
                tagColors[i + 3]
              } hover:brightness-105`}
            >
              {tag}
            </p>
          ))}
        </span>
      </div>
    </li>
  );
};

export default DisplayItem;
