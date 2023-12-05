import React from "react";
import { IoSearch } from "react-icons/io5";
const Search = () => {
  return (
    <section id="search" className="Container h-[50rem]">
      <div className="my-10 p-2 bg-white rounded-md shadow-sm">
        <div className="relative w-2/3 flex items-center gap-2">
          <IoSearch
            className="absolute top-2.5 left-2.5 text-zinc-500"
            size="20"
          />
          <input
            placeholder="Search drink/ingredient name"
            className="px-10 py-2 rounded-md w-full bg-zinc-300 placeholder-zinc-500"
          />
          <button>Random</button>
        </div>
      </div>
    </section>
  );
};

export default Search;
