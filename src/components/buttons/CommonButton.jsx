import PropTypes from 'prop-types';
import React from "react";

const CommonButton = ({ text, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`py-3 px-6 rounded-sm font-semibold cursor-pointer whitespace-nowrap  text-blue-200 transition-all duration-200   ${
        disabled ? 'disabled:cursor-not-allowed bg-gray-300 text-gray-200' : 'w-fit   hover:text-blue-100 hover:bg-blue-50 active:scale-95'
      } bg-white  scale-100 `}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
CommonButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
export default CommonButton;
