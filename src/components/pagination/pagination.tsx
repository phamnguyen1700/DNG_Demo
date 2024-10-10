import React from "react";

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    const pages = [];
    const pageLimit = 3; // Number of pages to show on either side of the current page

    if (totalPages <= 7) {
      // If total pages are small, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 ${i === currentPage ? "bg-violet-700 text-white rounded-lg" : "bg-gray-200 rounded-lg"}`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show first 3, last 3 and current range of pages with ellipses
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 mx-1 ${1 === currentPage ? "bg-violet-700 text-white rounded-lg" : "bg-gray-200 rounded-lg"}`}
        >
          1
        </button>
      );

      if (currentPage > pageLimit + 2) {
        pages.push(<span key="start-ellipsis" className="mx-1">...</span>);
      }

      for (let i = Math.max(2, currentPage - pageLimit); i <= Math.min(totalPages - 1, currentPage + pageLimit); i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 ${i === currentPage ? "bg-violet-700 text-white rounded-lg" : "bg-gray-200 rounded-lg"}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - (pageLimit + 1)) {
        pages.push(<span key="end-ellipsis" className="mx-1">...</span>);
      }

      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 mx-1 ${totalPages === currentPage ? "bg-violet-700 text-white rounded-lg" : "bg-gray-200 rounded-lg"}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-200 rounded-lg"
      >
        {"<"}
      </button>
      {renderPages()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-200 rounded-lg"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
