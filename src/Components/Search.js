import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesTwo } from "react-icons/gi";
import DisplayItem from "./DisplayItem";
import Categories from "./Categories";
import RandomDrink from "./RandomDrink";
import ChangePagePanel from "./ChangePagePanel";
// import { TagCats } from "../Object";
import { debounce } from "lodash";

const Search = () => {
  const [searchTags, setSearchTags] = useState({});
  const [diceRotate, setDiceRotate] = useState(false);

  // Pages
  const [pages, setPages] = useState(() => 1);
  const pageNumberLimit = 10;
  const [pageLimit, setPageLimit] = useState({ min: 0, max: pageNumberLimit });

  // Result for display
  const [searchResult, setSearchResult] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [randomDrink, setRandomDrink] = useState(null);
  const [quote, setQuote] = useState("");

  // Tags
  const [category, setCategory] = useState(new Set());
  const [alcohol, setAlcohol] = useState(new Set());
  const [glass, setGlass] = useState(new Set());

  // Fetch random Drink
  const fetchRandomDrink = () => {
    const randomCoctail = "www.thecocktaildb.com/api/json/v1/1/random.php";
    fetch(`https://${randomCoctail}`)
      .then((res) => res.json())
      .then((res) => setRandomDrink(res.drinks[0]));
    document
      .getElementById("randomDrink")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Fetch data by categories
  const fetchByCat = async () => {
    let arrayOfCat = Array.from(category);
    let arrayOfAlc = Array.from(alcohol);
    let arrayOfGla = Array.from(glass);
    // Mock api endpoint
    let mockServer = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?";
    // "https://4167e7bb-fa60-4b38-927e-2cf225a76684.mock.pstmn.io/api/json/v1/1/filter.php?";

    let resultCat = new Set();
    let resultAlc = new Set();
    let resultGla = new Set();

    for (let e of arrayOfCat) {
      let getDrinkInfo = await fetch(`${mockServer}c=${e}`)
        .then((res) => res.json())
        .then((res) => res.drinks)
        .catch((err) => console.log(err));
      resultCat = new Set([...resultCat, ...getDrinkInfo]);
    }
    for (let e of arrayOfAlc) {
      let getDrinkInfo = await fetch(`${mockServer}a=${e}`)
        .then((res) => res.json())
        .then((res) => res.drinks);
      resultAlc = new Set([...resultAlc, ...getDrinkInfo]);
    }
    for (let e of arrayOfGla) {
      let getDrinkInfo = await fetch(`${mockServer}g=${e}`)
        .then((res) => res.json())
        .then((res) => res.drinks);
      resultGla = new Set([...resultGla, ...getDrinkInfo]);
    }
    return setSearchResult(
      Array.from(new Set([...resultCat, ...resultAlc, ...resultGla]))
    );
  };
  // Debounce version of fetchByCat
  const debouncedFetchByCat = debounce(fetchByCat, 1000);

  // Fetch data by name
  const fetchData = async () => {
    const byName = "www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    fetch(`https://${byName}${quote}`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResult(res.drinks);
        // setFilteredResults(res.drinks);
      });
  };
  // Filters drinks to match selected tags
  const filterResult = () => {
    let arrayOfCat = Array.from(category);
    let arrayOfAlc = Array.from(alcohol);
    let arrayOfGla = Array.from(glass);
    let newResult = searchResult.filter(
      (drink) =>
        arrayOfCat.includes(drink.strCategory) ||
        arrayOfAlc.includes(drink.strAlcoholic) ||
        arrayOfGla.includes(drink.strGlass)
    );
    // console.log(newResult);
    setFilteredResults(() => newResult);
  };

  useEffect(() => {
    let arrayOfCat = Array.from(category);
    let arrayOfAlc = Array.from(alcohol);
    let arrayOfGla = Array.from(glass);
    let group = [...arrayOfCat, ...arrayOfAlc, ...arrayOfGla];
    quote.length > 0 && fetchData();
    quote.length <= 0 && group.length > 0 && debouncedFetchByCat();
    quote.length <= 0 && group.length <= 0 && setSearchResult([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote]);

  useEffect(() => {
    let arrayOfCat = Array.from(category);
    let arrayOfAlc = Array.from(alcohol);
    let arrayOfGla = Array.from(glass);
    let group = [...arrayOfCat, ...arrayOfAlc, ...arrayOfGla];
    if (group.length <= 0) {
      return setFilteredResults(searchResult);
    }
    setFilteredResults(searchResult);
    if (quote.length > 0) filterResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  useEffect(() => {
    let arrayOfCat = Array.from(category);
    let arrayOfAlc = Array.from(alcohol);
    let arrayOfGla = Array.from(glass);
    let length = [...arrayOfCat, ...arrayOfAlc, ...arrayOfGla].length;
    if (quote.length <= 0) {
      // fetchByCat();
      debouncedFetchByCat();
    }
    if (length <= 0) {
      setFilteredResults(searchResult);
    } else {
      filterResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, glass, alcohol]);

  // set number of pages
  useEffect(() => {
    filteredResults && filteredResults !== null
      ? setPages(Math.ceil(filteredResults.length / pageNumberLimit))
      : setPages(1);
  }, [filteredResults]);

  useEffect(() => {
    // Fetch drink category tags to display in filter search section
    let mock = "https://www.thecocktaildb.com/api/json/v1/1/list.php?";

    // "https://4167e7bb-fa60-4b38-927e-2cf225a76684.mock.pstmn.io/api/json/v1/1/list.php?";
    const catReq = fetch(`${mock}c=list`).then((response) => response.json());
    const glassReq = fetch(`${mock}g=list`).then((response) => response.json());
    const alcoReq = fetch(`${mock}a=list`).then((response) => response.json());
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
    <section
      id="search"
      className="Container min-h-[50rem] flex flex-col justify-between"
    >
      <div
        className="mt-10 p-3 bg-white rounded-md shadow-sm flex flex-col gap-3"
        id="searchBar"
      >
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
        >
          {Object.keys(searchTags).map((cat, index) => (
            <Categories
              key={index}
              cat={cat}
              category={category}
              alcohol={alcohol}
              glass={glass}
              searchTags={searchTags}
              setCategory={setCategory}
              setAlcohol={setAlcohol}
              setGlass={setGlass}
            />
          ))}
        </ul>
        {/* random drink */}
        <RandomDrink
          randomDrink={randomDrink}
          setRandomDrink={setRandomDrink}
        />

        {/* Result */}
        <ul className="flex flex-col gap-5" id="drinkResults">
          <p className="font-bold">{filteredResults.length} results</p>
          {filteredResults.map((item, index) => {
            return (
              index + 1 > pageLimit.min &&
              index + 1 <= pageLimit.max && (
                <DisplayItem
                  item={item}
                  bg={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
                  key={item.idDrink}
                />
              )
            );
          })}
        </ul>
      </div>

      {/* pages panel */}
      <ChangePagePanel
        pages={pages}
        setPageLimit={setPageLimit}
        quote={quote}
        pageNumberLimit={pageNumberLimit}
      />
    </section>
  );
};

export default Search;
