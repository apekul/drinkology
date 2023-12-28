import React from "react";
import { tagColors } from "../Object";

const DisplayItem = ({ item, bg }) => {
  return (
    <li
      className={`grid grid-cols-3 grid-flow-row auto-rows-max lg:flex w-full gap-3 rounded-md p-3 shadow h-fit lg:h-[20rem] ${bg}`}
    >
      <img
        src={item.strDrinkThumb}
        alt={item.strDrink}
        className="w-full sm:w-[20rem] h-auto rounded-md col-span-3 sm:col-span-1"
      />
      {/* Ingredients */}
      <ul className="flex flex-col w-full flex-wrap max:h-[10rem] gap-2 overflow-x-auto sm:col-start-2 col-span-3 sm:row-start-1 ">
        {Object.keys(item).map(
          (v, i) =>
            v.includes("strIngredient") &&
            item[v] !== null &&
            item[v].length !== 0 && (
              <li
                key={i}
                className="flex text-center items-center gap-2 h-auto"
              >
                <img
                  src={`https://www.thecocktaildb.com/images/ingredients/${item[v]}-Medium.png`}
                  alt={item.strIngredient1}
                  className="w-[2rem] h-[2rem]"
                />
                <span className="flex gap-2 whitespace-nowrap">
                  <p>{item["strMeasure" + v.replace(/\D/g, "")]}</p>
                  <p className="font-bold">{item[v]}</p>
                </span>
              </li>
            )
        )}
      </ul>
      <div className="flex flex-col justify-between w-full h-fit lg:h-full col-span-3 rows-start-3 ">
        <span className="flex flex-col gap-2">
          <p className="font-bold text-2xl">{item.strDrink}</p>
          <p className="max-h-[11rem] overflow-y-auto">
            {item.strInstructions}
          </p>
        </span>
        {/* tags */}
        <span className="flex items-end flex-wrap gap-2 pt-2 overflow-y-auto">
          <p
            className={`py-1 font-bold px-2 rounded-md cursor-pointer ${tagColors[0]} hover:brightness-105`}
          >
            {item.strAlcoholic}
          </p>
          <p
            className={`py-1 font-bold px-2 rounded-md cursor-pointer ${tagColors[1]} hover:brightness-105`}
          >
            {item.strCategory}
          </p>
          <p
            className={`py-1 font-bold px-2 rounded-md cursor-pointer ${tagColors[2]} hover:brightness-105`}
          >
            {item.strGlass}
          </p>
          {item.strTags?.split(",").map((tag, i) => (
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
