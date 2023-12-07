import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import { drinks } from "../Object";
const Search = () => {
  const [category, setCategory] = useState(() => {
    let data = fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
    )
      .then((response) => response.json())
      .then((result) => (data = result.drinks));
    return data;
  });
  const [diceRotate, setDiceRotate] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [quote, setQuote] = useState("");

  const fetchData = () => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${quote[0]}`
    )
      .then((response) => response.json())
      .then((result) => setSearchResult(result.drinks));
  };
  useEffect(() => {
    if (quote.length > 0) fetchData();
  }, [quote]);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`)
      .then((response) => response.json())
      .then((result) => setCategory(result.drinks));
  }, []);

  return (
    <section id="search" className="Container min-h-[50rem]">
      <div className="my-10 p-3 bg-white rounded-md shadow-sm flex flex-col gap-5">
        <div className="relative w-2/3 flex items-center gap-2">
          <IoSearch
            className="absolute top-2.5 left-2.5 text-zinc-500"
            size="20"
          />
          <input
            placeholder="Search drink/ingredient name"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className="px-10 py-2 rounded-md w-full bg-zinc-300 placeholder-zinc-500"
          />
          <div className="flex gap-2 items-center whitespace-nowrap cursor-pointer ">
            <div className="bg-zinc-300 rounded-md ">
              <GiPerspectiveDiceSixFacesTwo
                onClick={() => setDiceRotate(!diceRotate)}
                size="40"
                className={`cursor-pointer transition-all duration-[550ms] text-purple-700 ${
                  diceRotate && "rotate-[360deg]"
                }`}
              />
            </div>
          </div>
        </div>
        {/* Category */}
        <ul className="flex gap-2 flex-wrap">
          {Object.values(category).map((cat, index) => (
            <li
              key={index}
              className="border-2 py-1 px-3 rounded-full cursor-pointer text-zinc-500"
            >
              {cat.strCategory}
            </li>
          ))}
        </ul>
        {/* Result */}
        <ul className="border-t-2 flex flex-col gap-5">
          <p className="font-bold">Results for "Quote"</p>
          {searchResult.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 flex gap-3 rounded-md p-2 shadow"
            >
              <img
                src={item.strDrinkThumb}
                alt={item.strDrink}
                className="w-[200px] h-[200px] rounded-md"
              />
              {/* title ingredients */}
              <div className="w-2/3">
                <p className="font-bold text-lg">{item.strDrink}</p>

                <ul>
                  <li className="flex flex-col text-center bg-red-200 w-[5rem] h-[5rem] ">
                    <img
                      src={`https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Medium.png`}
                      alt={item.strIngredient1}
                      className="w-full h-full"
                    />
                    <p>{item.strIngredient1}</p>
                  </li>
                </ul>
              </div>
              {/* instruction/tags */}
              <div className="w-full">
                <p className="">{item.strInstructions}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Search;
