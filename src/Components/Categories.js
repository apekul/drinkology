import React, { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Categories = ({
  cat,
  category,
  alcohol,
  glass,
  searchTags,
  setCategory,
  setAlcohol,
  setGlass,
  updateTag,
}) => {
  const [showTags, setShowTags] = useState({
    category: true,
    alcohol: false,
    glass: false,
  });
  return (
    <li className="flex flex-col gap-2">
      <span className="flex items-center justify-between px-1 gap-2">
        <span className="flex items-center">
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

        {/* clear category button */}
        {cat === "category" && category.size > 0 && (
          <p
            className="cursor-pointer bg-gray-200 text-red-300 px-1 rounded-md text-center font-bold hover:text-red-500"
            onClick={() => setCategory(new Set())}
          >
            Clear
          </p>
        )}
        {cat === "alcohol" && alcohol.size > 0 && (
          <p
            className="cursor-pointer bg-gray-200 text-red-300 px-1 rounded-md text-center font-bold hover:text-red-500"
            onClick={() => setAlcohol(new Set())}
          >
            Clear
          </p>
        )}
        {cat === "glass" && glass.size > 0 && (
          <p
            className="cursor-pointer bg-gray-200 text-red-300 px-1 rounded-md text-center font-bold hover:text-red-500"
            onClick={() => setGlass(new Set())}
          >
            Clear
          </p>
        )}
      </span>
      <ul
        className={`flex gap-2 flex-wrap ${showTags[cat] ? "block" : "hidden"}`}
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
  );
};

export default Categories;
