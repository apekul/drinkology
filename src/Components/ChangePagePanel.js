import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const ChangePagePanel = ({ pages, setPageLimit, quote, pageNumberLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageList, setShowPageList] = useState(false);

  useEffect(() => {
    setPageLimit({
      min: currentPage <= 1 ? 0 : (currentPage - 1) * pageNumberLimit,
      max: currentPage * pageNumberLimit,
    });
    document
      .getElementById("drinkResults")
      .scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [quote]);

  return (
    <div className="flex gap-5 w-full flex-col my-5 text-xl select-none ">
      <div className="flex w-full gap-3  items-center justify-center">
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
                      className={`cursor-pointer bg-gray-300 w-8 text-center py-1 border ${
                        currentPage === i + 1 && "border-black"
                      }`}
                    >
                      {i + 1}
                    </p>
                  </div>
                )
              );
            })}

            <MdArrowForwardIos
              size={30}
              className={`bg-gray-300 p-1 ${
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
      {/* dropdown page select */}
      {pages > 1 && (
        <div className="flex relative items-end justify-center cursor-pointer">
          <p
            className="border border-black w-8 text-center underline rounded-sm"
            onClick={() => setShowPageList(!showPageList)}
          >
            {currentPage}
          </p>
          {showPageList && (
            <div className="absolute bottom-8 bg-white border border-black w-8 text-center">
              {Array.from({ length: pages }).map((_, i) => (
                <p
                  className="hover:bg-gray-200"
                  onClick={() => {
                    setCurrentPage(i + 1);
                    setShowPageList(false);
                  }}
                >
                  {i + 1}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangePagePanel;
