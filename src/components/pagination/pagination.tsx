import React from 'react';

const Pagination = () => {
  return (
    <div className="flex items-center justify-center space-x-2 pt-4">
      <p>
        Hiển thị 1 - 10 
      </p>

    
      <button
        className="text-sm px-2 py-1 h-8 w-8 border rounded text-gray-400"
      >
        &lt;
      </button>

    
      <button className="text-sm px-2 py-1 h-8 w-8 border rounded bg-violet-900 text-white">
        1
      </button>
      <button className="text-sm px-2 py-1 h-8 w-8 border rounded  ">
        2
      </button>
      <button className="text-sm px-2 py-1 h-8 w-8 border rounded  ">
        3
      </button>
      <button className="text-sm px-2 py-1 h-8 w-8 border rounded  ">
        4
      </button>
    
      <button
        className="text-sm px-2 py-1 h-8 w-8 border rounded text-gray-400"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
