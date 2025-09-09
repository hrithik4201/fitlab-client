import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center w-full min-h-[200px] space-y-4">
    <div className="relative">
      <Loader2 className="h-8 w-8 animate-spin text-[#ff2625]" />
      <div className="absolute inset-0 h-8 w-8 animate-ping bg-[#ff2625] rounded-full opacity-20"></div>
    </div>
    <p className="text-sm text-gray-600 animate-pulse">Loading...</p>
  </div>
);

export default Loader;
