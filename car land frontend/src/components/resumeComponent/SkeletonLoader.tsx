import React from "react";

const SkeletonLoader = ({count}:{count:number}) => {
    console.log(count)
  return (
    
    <div
      aria-label="View Item"
      aria-hidden="true"
      className="inline-block mx-2 my-2 overflow-hidden duration-300  transform bg-white rounded shadow-sm hover:-translate-y-2 drop-shadow-md"
    >
      {" "}
      <div className=" shadow rounded-md p-10 max-w-sm w-auto mx-auto">
        <div className="animate-pulse   ">
          <div className="rounded bg-slate-200 h-40 w-44"></div>
          <div className=" space-y-6 py-5 ">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
