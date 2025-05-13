import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useTheme } from "../Context/ThemeContext"; // Import your theme context

const Pagination = () => {
  const context = useContext(AppContext);
  const { theme } = useTheme(); // Get current theme

  console.log("Pagination context:", context); 

  const { page, totalPages, handlePageChange } = context;

  const handleClick = (newPage) => {
    if (typeof handlePageChange !== "function") {
      console.error("handlePageChange is not a function", handlePageChange);
      return;
    }

    handlePageChange(newPage);
  };

  return (
    <div className={`fixed inset-x-0 bottom-0 w-full py-2 ${theme === 'dark' ? 'bg-gray-900 border-t-gray-700' : 'bg-white border-t-gray-300'} border-t-2`}>
      <div className="flex items-center w-11/12 max-w-2xl mx-auto gap-x-3">
        {page > 1 && (
          <button
            className={`px-4 py-1 rounded-md ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} border-2`}
            onClick={() => handleClick(page - 1)}
          >
            Previous
          </button>
        )}
        {page < totalPages && (
          <button
            className={`px-4 py-1 rounded-md ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} border-2`}
            onClick={() => handleClick(page + 1)}
          >
            Next
          </button>
        )}
        <p className={`ml-auto text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Pagination;