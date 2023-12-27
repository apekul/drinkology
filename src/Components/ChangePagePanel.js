import React, { useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const ChangePagePanel = ({ pages, setPageLimit, quote }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumberLimit = 10;

  useEffect(() => {
    setPageLimit({
      min: currentPage <= 1 ? 0 : (currentPage - 1) * pageNumberLimit,
      max: currentPage * pageNumberLimit,
    });
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
            className={`bg-gray-300 text-gray-400 p-1 ${
              currentPage !== 1 &&
              "text-black cursor-pointer hover:brightness-95"
            }`}
            onClick={() =>
              setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1))
            }
          />
          {Array.from({ length: pages }).map((_, i) => (
            <div key={i}>
              <p
                onClick={() => setCurrentPage(i + 1)}
                className={`${
                  i + 1 === currentPage && "border-black"
                } cursor-pointer bg-gray-300 px-2 py-1 border`}
              >
                {i + 1}
              </p>
            </div>
          ))}
          <MdArrowForwardIos
            size={30}
            className={`bg-gray-300 text-gray-400 p-1 ${
              currentPage !== pages &&
              "text-black cursor-pointer hover:brightness-95"
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
