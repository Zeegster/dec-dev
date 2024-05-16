import PropTypes from 'prop-types';
import React from "react";
const HeaderInner = ({ title, subtitle }) => {
  return (
    <header className='w-full relative h-min'>
      <h1 className=' bg-blue-100 text-3xl font-dela text-center text-white p-4'>
        {title}
      </h1>
      {subtitle && (
        <h2 className='text-blue-100 text-xl border-b border-blue-400 text-center font-medium max-w-4xl mx-auto py-4'>
          {subtitle}
        </h2>
      )}
    </header>
  );
};

HeaderInner.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default HeaderInner;
