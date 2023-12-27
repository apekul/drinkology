import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import DisplayItem from "./DisplayItem";
import { MdOutlineArrowDropDown } from "react-icons/md";
import ChangePagePanel from "./ChangePagePanel";

const Search = () => {
  const [searchTags, setSearchTags] = useState({});
  const [diceRotate, setDiceRotate] = useState(false);

  // Pages
  const [pages, setPages] = useState(() => 1);
  const [pageLimit, setPageLimit] = useState({ min: 0, max: 10 });

  // Result for display
  const [searchResult, setSearchResult] = useState([]);
  // const [resultIDs, setResultIDs] = useState([]);
  const [randomDrink, setRandomDrink] = useState(null);
  const [quote, setQuote] = useState("");

  // Tags
  const [category, setCategory] = useState(new Set());
  const [alcohol, setAlcohol] = useState(new Set());
  const [glass, setGlass] = useState(new Set());
  const [showTags, setShowTags] = useState({
    category: true,
    alcohol: false,
    glass: false,
  });

  const updateTag = (cat, value) => {
    if (cat === "category") {
      return category.has(value.strCategory)
        ? setCategory((prev) => {
            let newSet = new Set(prev);
            newSet.delete(value.strCategory);
            return newSet;
          })
        : setCategory((prev) => new Set(prev).add(value.strCategory));
    }
    if (cat === "alcohol") {
      return alcohol.has(value.strAlcoholic)
        ? setAlcohol((prev) => {
            let newSet = new Set(prev);
            newSet.delete(value.strAlcoholic);
            return newSet;
          })
        : setAlcohol((prev) => new Set(prev).add(value.strAlcoholic));
    }
    if (cat === "glass") {
      return glass.has(value.strGlass)
        ? setGlass((prev) => {
            let newSet = new Set(prev);
            newSet.delete(value.strGlass);
            return newSet;
          })
        : setGlass((prev) => new Set(prev).add(value.strGlass));
    }
  };

  // Fetch data by categories
  const fetchByCat = async () => {
    let arrayOfCat = Array.from(category);
    const byCat = "www.thecocktaildb.com/api/json/v1/1/filter.php?c=";
    // const byID = "www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
    let resultCat = new Set();

    // let getDrinkByID = async (id) => {
    //   let byIdResult = await fetch(`https://${byID}${id}`)
    //     .then((response) => response.json())
    //     .then((response) => response.drinks);
    //   return byIdResult;
    // };

    for (let e of arrayOfCat) {
      let getDrinkInfo = await fetch(`https://${byCat}${e}`)
        .then((res) => res.json())
        .then((res) => res.drinks);
      resultCat = new Set([...resultCat, ...getDrinkInfo]);
    }
    // return setResultIDs(resultCat);
  };

  // Fetch random drink
  const fetchRandomDrink = () => {
    const randomCoctail = "www.thecocktaildb.com/api/json/v1/1/random.php";
    fetch(`https://${randomCoctail}`)
      .then((res) => res.json())
      .then((res) => setRandomDrink(res.drinks[0]));
  };

  // Fetch data by name
  const fetchData = async () => {
    const byName = "www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    // const byIng = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
    fetch(`https://${byName}${quote}`)
      .then((res) => res.json())
      .then((res) => setSearchResult(res.drinks));
  };

  useEffect(() => {
    quote.length > 0 ? fetchData() : setSearchResult([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote]);

  useEffect(() => {
    fetchByCat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, glass, alcohol]);

  useEffect(() => {
    searchResult && searchResult !== null
      ? setPages(Math.ceil(searchResult.length / 10))
      : setPages(1);
  }, [searchResult]);

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

  return (
    <section id="search" className="Container min-h-[50rem]">
      <div className="mt-10 p-3 bg-white rounded-md shadow-sm flex flex-col gap-3">
        <div className="relative w-full sm:w-2/3 flex items-center gap-2">
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
                onClick={() => {
                  setDiceRotate(!diceRotate);
                  return fetchRandomDrink();
                }}
                size="40px"
                className={`cursor-pointer transition-all duration-[550ms] text-purple-700 ${
                  diceRotate && "rotate-[360deg]"
                }`}
              />
            </div>
          </div>
        </div>
        {/* Categories */}
        <ul
          className={`flex gap-3 flex-col flex-wrap border-b-2 pb-5 transition-all`}
          id="categories"
        >
          {Object.keys(searchTags).map((cat, index) => (
            <li key={index} className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <p>Filter by: {cat}</p>
                <MdOutlineArrowDropDown
                  size={30}
                  className={`transition-all duration-[400ms] cursor-pointer ${
                    showTags[cat] && "rotate-180"
                  }`}
                  onClick={() =>
                    setShowTags((prev) => ({ ...prev, [cat]: !prev[cat] }))
                  }
                />
                <p className="bg-gray-300 font-bold px-1">
                  {cat === "category" && category.size > 0 && category.size}
                  {cat === "alcohol" && alcohol.size > 0 && alcohol.size}
                  {cat === "glass" && glass.size > 0 && glass.size}
                </p>
              </span>
              <ul
                className={`flex gap-2 flex-wrap ${
                  showTags[cat] ? "block" : "hidden"
                }`}
              >
                {searchTags[cat].map((v, i) => (
                  <li
                    key={i}
                    className={`border-2 py-1 px-3 rounded-full cursor-pointer text-zinc-500 hover:brightness-90
                    ${category.has(v.strCategory) && "bg-gray-200"}
                    ${alcohol.has(v.strAlcoholic) && "bg-gray-200"}
                    ${glass.has(v.strGlass) && "bg-gray-200"}`}
                    onClick={() => updateTag(cat, v)}
                  >
                    {Object.values(v).map((item, i) => item)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {/* random drink */}
        {randomDrink && (
          <div className={`flex flex-col gap-5 border-b-2 pb-5`}>
            <p className="font-bold">Random Drink</p>
            <DisplayItem item={randomDrink} bg="bg-indigo-100" />
          </div>
        )}
        {/* Result */}
        <ul className="flex flex-col gap-5">
          <p className="font-bold">
            {searchResult?.length} results for "{quote}"
          </p>
          {searchResult?.map(
            (item, index) =>
              index + 1 > pageLimit.min &&
              index + 1 <= pageLimit.max && (
                <DisplayItem
                  item={item}
                  bg={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                  key={index}
                />
              )
          )}
        </ul>
      </div>

      {/* pages panel */}
      <ChangePagePanel
        pages={pages}
        setPageLimit={setPageLimit}
        quote={quote}
      />
    </section>
  );
};

export default Search;
