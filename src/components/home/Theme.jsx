import React from "react";
const Theme = ({data}) => {
  return (
    <div className="w-full h-24 bg-gray-100 shadow-2xl font-semibold flex items-center justify-between px-3 space-x-2 mb-24 z-10 relative">
      <div className="text-blue-200 text-4xl font-dela uppercase ">Тема</div>
      <div className="text-blue-100 text-center text-xl font-dela max-w-4xl uppercase">
      {data.theme}
      </div>
      <div className="text-blue-200 text-4xl font-dela ">СПО</div>
    </div>
  );
}; 

export default Theme;
