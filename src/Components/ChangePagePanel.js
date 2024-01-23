import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const ChangePagePanel = ({ pages, setPageLimit, quote, pageNumberLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPageLimit({
      min: currentPage <= 1 ? 0 : (currentPage - 1) * pageNumberLimit,
      max: currentPage * pageNumberLimit,
    });
    document.getElementById("drinkResults");
    // .scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [quote]);

  return (
    <div className="flex text-xl gap-3 my-5 items-center justify-center w-full select-none">
      {pages > 1 && (
        <>
          <MdArrowBackIosNew
            size={30}
            className={`bg-gray-300 p-1 ${
              currentPage !== 1
                ? "text-black cursor-pointer hover:brightness-95"
                : "text-gray-400"
            }`}
            onClick={() =>
              setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1))
            }
          />
          {Array.from({ length: pages }).map((_, i) => {
            let less = i - 4 <= 0 ? i - 4 : i - 2;
            let more = i + 5 < pages ? i + 4 : i + 6;
            return (
              currentPage < more &&
              currentPage > less && (
                <div key={i}>
                  <p
                    onClick={() => setCurrentPage(i + 1)}
                    className={`${
                      i + 1 === currentPage && "border-black"
                    } cursor-pointer bg-gray-300 w-8 text-center py-1 border`}
                  >
                    {i + 1}
                  </p>
                </div>
              )
            );
          })}
          <MdArrowForwardIos
            size={30}
            className={`bg-gray-300  p-1 ${
              currentPage !== pages
                ? "text-black cursor-pointer hover:brightness-95"
                : "text-gray-400"
            }`}
            onClick={() =>
              setCurrentPage((prev) => (prev === pages ? pages : prev + 1))
            }
          />
        </>
      )}
    </div>
  );
};

export default ChangePagePanel;
