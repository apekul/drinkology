import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import { tagColors } from "../Object";
const Search = () => {
  const [searchTags, setSearchTags] = useState({});
  const [diceRotate, setDiceRotate] = useState(false);
  // Result for display
  const [searchResult, setSearchResult] = useState([]);
  const [quote, setQuote] = useState("");

  const [filterByTags, setFilterByTags] = useState([]);

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

  // Fetch Drik category for search
  useEffect(() => {
    const catReq = fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    ).then((response) => response.json());
    const glassReq = fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list"
    ).then((response) => response.json());
    const alcoReq = fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
    ).then((response) => response.json());

    Promise.all([catReq, glassReq, alcoReq])
      .then(([category, glass, alcohol]) => {
        setSearchTags({
          category: category.drinks,
          glass: glass.drinks,
          alcohol: alcohol.drinks,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   setSearchResult((prev) => prev.filter((v) => v.includes(filterByTags[0])));
  // }, [filterByTags]);
  // let test = Object.entries(filterByTags[0]);
  // console.log(test);
  console.log(searchResult);
  return (
    <section id="search" className="Container min-h-[50rem]">
      <div className="my-10 p-3 bg-white rounded-md shadow-sm flex flex-col gap-3">
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
        {/* Categories */}
        <ul className="flex gap-3 flex-col flex-wrap">
          {Object.keys(searchTags).map((cat, index) => (
            <li key={index} className="flex flex-col gap-2">
              <p>Filter by: {cat}</p>
              <ul className="flex gap-2 flex-wrap">
                {searchTags[cat].map((v, i) => (
                  <li
                    key={i}
                    className={`border-2 py-1 px-3 rounded-full cursor-pointer text-zinc-500 hover:brightness-90 ${
                      filterByTags.includes(v) && "bg-gray-200"
                    }`}
                    onClick={() =>
                      setFilterByTags((prev) =>
                        !filterByTags.includes(v)
                          ? [...prev, v]
                          : prev.filter((tag) => tag !== v)
                      )
                    }
                  >
                    {Object.values(v).map((item, i) => item)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {/* Result */}
        <ul className="border-t-2 flex flex-col gap-3">
          <p className="font-bold">Results for "{quote}"</p>
          {searchResult.map((item, index) => (
            <li
              key={index}
              className={` flex flex-col lg:flex-row gap-3 rounded-md p-3 shadow h-[20rem] ${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              <img
                src={item.strDrinkThumb}
                alt={item.strDrink}
                className="w-[20rem] h-full rounded-md"
              />
              <div className="flex gap-3 w-full justify-between">
                {/* Ingredients */}
                <div className="w-full">
                  <ul className="flex flex-col flex-wrap gap-2 h-full">
                    {Object.keys(item).map(
                      (v, i) =>
                        v.includes("strIngredient") &&
                        item[v] !== null && (
                          <li
                            key={i}
                            className="flex text-center items-center gap-2 h-auto"
                          >
                            <img
                              src={`https://www.thecocktaildb.com/images/ingredients/${item[v]}-Medium.png`}
                              alt={item.strIngredient1}
                              className="w-[2rem] h-[2rem]"
                            />
                            <span className="flex gap-2">
                              <p>{item["strMeasure" + v.replace(/\D/g, "")]}</p>
                              <p className="font-bold">{item[v]}</p>
                            </span>
                          </li>
                        )
                    )}
                  </ul>
                </div>
                <span className="flex flex-col justify-between w-full h-full ">
                  <span className="h-full ">
                    <p className="font-bold pb-2 text-2xl">{item.strDrink}</p>
                    <p className=" max-h-[13rem] overflow-y-auto">
                      {item.strInstructions}
                    </p>
                  </span>
                  {/* tags */}
                  <span className="flex items-center flex-wrap gap-2">
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
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Search;
