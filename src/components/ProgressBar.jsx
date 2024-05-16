import PropTypes from 'prop-types';
import React from "react";
export default function ProgressBar({ activeStep, totalSteps }) {
  ProgressBar.propTypes = {
    activeStep: PropTypes.number,
    totalSteps: PropTypes.number,
  };
  return (
    <div className='w-full flex justify-between gap-2'>
      {Array.from({ length: totalSteps }, (_, i) => {
        const isActive = i === activeStep;

        return (
          <div
            key={i}
            className={`flex-1 h-1 ${isActive ? 'bg-blue-200' : 'bg-gray-100'}`}
          >
          </div>
        );
      })}
    </div>
  );
}
