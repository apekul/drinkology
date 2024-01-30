import React from "react";

const LoadingItem = () => {
  return (
    <div class=" shadow rounded-md p-4 w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="w-full sm:w-[20rem] h-[16rem] rounded-md col-span-3 sm:col-span-1 bg-slate-700 "></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="h-2 bg-slate-700 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-700 rounded col-span-2"></div>
              <div class="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingItem;
