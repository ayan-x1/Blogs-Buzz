import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Pagination = () => {
  const context = useContext(AppContext);

  console.log("Pagination context:", context); // ✅ Debug output

  const { page, totalPages, handlePageChange } = context;

  const handleClick = (newPage) => {
    if (typeof handlePageChange !== "function") {
      console.error("handlePageChange is not a function", handlePageChange);
      return;
    }

    handlePageChange(newPage);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 w-full py-2 bg-white border-t-2 border-t-gray-300">
      <div className="flex items-center w-11/12 max-w-2xl mx-auto gap-x-3">
        {page > 1 && (
          <button
            className="px-4 py-1 border-2 border-gray-300 rounded-md"
            onClick={() => handleClick(page - 1)}
          >
            Previous
          </button>
        )}
        {page < totalPages && (
          <button
            className="px-4 py-1 border-2 border-gray-300 rounded-md"
            onClick={() => handleClick(page + 1)}
          >
            Next
          </button>
        )}
        <p className="ml-auto text-sm font-semibold">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
