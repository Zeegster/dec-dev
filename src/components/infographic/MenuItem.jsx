import React from 'react';

// import setting from "../../assets/infographic/setting.svg";

const MenuItem = ({ title, setModal, index, image }) => {
  const isLast = index === 16 - 1;
  const toggleModal = () => {
    setModal((prev) => {
      const newMap = new Map(prev);
      newMap.set(index, !newMap.get(index));
      return newMap;
    });
  };

  return (
    <>
      <div
        onClick={toggleModal}
        className={`bg-blue-500  cursor-pointer  w-1/6 flex justify-center items-center text-center transition-all duration-200 hover:scale-105 shadow-md 
        ${isLast ? 'h-28' : 'h-52'} ${isLast ? 'w-2/4' : 'flex-col max-w-sm'}`}
      > 

        <div className="flex justify-center">
          {image}
        </div>

      <div className="h-14">
        <div className="h-full flex items-center">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      </div>


      
      </div>
    </>
  );
};

export default MenuItem;
