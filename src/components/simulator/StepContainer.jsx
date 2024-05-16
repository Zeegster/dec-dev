import PropTypes from 'prop-types';
import React from "react";


const StepContainer = ({ title, content, steps, activeStep}) => {

  return (
    <>
      <div className='text-black flex items-center w-full justify-between border-b-2 border-blue-200'>
        <h2 className='text-black text-2xl'>{title}</h2>
        <p className='w-28 text-center text-white bg-blue-200 py-2 px-6 font-semibold text-xl whitespace-nowrap'>
          {activeStep + 1} / {steps}
        </p>
      </div>


      <div className='text-black font-normal overflow-y-auto flex flex-col text-lg py-4 my-auto'>
        {content}
      </div>
    </>
  );
};
StepContainer.propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
  steps: PropTypes.number,
  activeStep: PropTypes.number,
  question: PropTypes.object,
};

export default StepContainer;
