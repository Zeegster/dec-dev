import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyModal from '../MyModal';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
// import i from "../../assets/home/menuItem.svg";
import React from "react";
const MenuItem = ({id, title, desk, supdesk, img, link ,collapse_s,collapse_t}) => {
  const [modal, setModal] = useState(new Map());
 
    
  
  const toggleModal = () => {
    setModal((prev) => {
      const newMap = new Map(prev);
      newMap.set(id,!newMap.get(id));
      return newMap;
    });
  };

  const handleOnClose = () => setModal(false);
  return (
    <>
      <div className='flex ml-4 relative z-10 '>
        <div className='w-2 h-24 bg-blue-200' />
        <div className='bg-blue-200 h-24 mb-8 w-[60%] ml-2 font-semibold'>
          <div className='flex h-full'>
            <div className='w-[40%] text-white flex items-center pl-2 relative'>
              <h2 className='text-base pr-12'>{title}</h2>
              <Link
                to={link}
                className='absolute -right-12'
              >
                <div className=' p-6 border-4 border-blue-300 bg-white rounded-full flex items-center transition-all duration-200 hover:scale-105'>
                  <img
                    className=' w-14 h-full'
                    src={img}
                  />
                </div>
              </Link>
            </div>

            <div className='w-[60%] h-full  bg-white text-sm flex place-items-center'>
              <Link
                to={link}
                className='grid'
              >
                <div className='ml-16 mr-1 flex flex-col justify-center'>
                  <h2 className='text-blue-100 mb-1'>{desk}</h2>
                  <h2 className='text-gray-100'>{supdesk}</h2>
                </div>
              </Link>
              <div className='ml-auto flex flex-col space-y-2 relative z-30 py-2 mr-2'>
                <svg
                  width='30'
                  height='37'
                  onClick={toggleModal}
                  viewBox='0 0 30 37'
                  className='w-8 h-auto cursor-pointer relative z-20 transition-all duration-200 hover:scale-110'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g>
                    <title>Guide Icon</title>
                    <path
                      d='m16.96,9.17c0,0.48 -0.19,0.95 -0.54,1.29c-0.34,0.35 -0.81,0.54 -1.29,0.54c-0.49,0 -0.96,-0.19 -1.3,-0.54c-0.35,-0.34 -0.54,-0.81 -0.54,-1.29c0,-0.49 0.19,-0.96 0.54,-1.3c0.34,-0.34 0.81,-0.54 1.3,-0.54c0.48,0 0.95,0.2 1.29,0.54c0.35,0.34 0.54,0.81 0.54,1.3zm-3.21,5.04l0,9.17c0,0.36 0.14,0.71 0.4,0.97c0.26,0.26 0.61,0.4 0.98,0.4c0.36,0 0.71,-0.14 0.97,-0.4c0.26,-0.26 0.4,-0.61 0.4,-0.97l0,-9.17c0,-0.37 -0.14,-0.72 -0.4,-0.97c-0.26,-0.26 -0.61,-0.41 -0.97,-0.41c-0.37,0 -0.72,0.15 -0.98,0.41c-0.26,0.25 -0.4,0.6 -0.4,0.97zm-13.75,-9.63c0,-1.21 0.48,-2.38 1.34,-3.24c0.86,-0.86 2.03,-1.34 3.24,-1.34l21.09,0c0.6,0 1.19,0.12 1.75,0.35c0.56,0.23 1.06,0.57 1.49,0.99c0.42,0.43 0.76,0.93 0.99,1.49c0.23,0.56 0.35,1.15 0.35,1.75l0,26.13c0,0.36 -0.14,0.71 -0.4,0.97c-0.26,0.26 -0.61,0.4 -0.97,0.4l-26.13,0c0,0.49 0.19,0.96 0.54,1.3c0.34,0.34 0.81,0.54 1.29,0.54l24.3,0c0.36,0 0.71,0.14 0.97,0.4c0.26,0.26 0.4,0.61 0.4,0.97c0,0.37 -0.14,0.72 -0.4,0.97c-0.26,0.26 -0.61,0.41 -0.97,0.41l-24.3,0c-1.21,0 -2.38,-0.49 -3.24,-1.35c-0.86,-0.86 -1.34,-2.02 -1.34,-3.24l0,-27.5zm27.5,24.75l0,-24.75c0,-0.48 -0.19,-0.95 -0.54,-1.29c-0.34,-0.35 -0.81,-0.54 -1.29,-0.54l-21.09,0c-0.48,0 -0.95,0.19 -1.29,0.54c-0.35,0.34 -0.54,0.81 -0.54,1.29l0,24.75l24.75,0z'
                      fill='black'
                      id='svg_1'
                    />
                  </g>
                </svg>
                <Link to={link}>
                  <svg
                    width='30'
                    height='30'
                    viewBox='0 0 37 37'
                    className='w-8 h-auto cursor-pointer transition-all duration-200 hover:scale-110'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g
                      id='svg_2'
                      data-name='svg_2'
                    >
                      <g id='svg_2'>
                        <path
                          id='svg_2-2'
                          data-name='svg 2'
                          d='M14,24.48v-12a.76.76,0,0,1,.13-.44.78.78,0,0,1,.32-.3,1,1,0,0,1,.45-.11.79.79,0,0,1,.43.14l9.65,6a.84.84,0,0,1,.29.3.79.79,0,0,1,.11.39.81.81,0,0,1-.11.41,1,1,0,0,1-.29.3l-9.65,6a.78.78,0,0,1-.43.13.9.9,0,0,1-.45-.1.8.8,0,0,1-.32-.31.75.75,0,0,1-.13-.43Z'
                        />
                        <path d='M18.5,3.5a15,15,0,1,1-15,15,15,15,0,0,1,15-15m0-3.5A18.5,18.5,0,1,0,37,18.5,18.5,18.5,0,0,0,18.5,0Z' />
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='w-8 h-24 bg-blue-200 ml-2 rounded-e-full' />
      </div>

      <MyModal
        onClose={handleOnClose}
        visible={modal.has()}
        setModal={setModal}
      >
        <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto bg-white rounded-lg text-left transition-all mb-8 '>
          <div className='bg-white p-6'>
            <div className='flex items-start w-full'>
              <div className=' mt-0 text-left space-y-6'>
                <Dialog.Title
                  as='h3'
                  className='font-semibold text-base leading-6 text-blue-400'
                >
                  Рекомендации
                </Dialog.Title>

                <div className='collapse collapse-arrow bg-base-200 '>
                  <input
                    type='checkbox'
                    name='my-accordion'
                  />
                  <h4 className='collapse-title text-xl font-medium'>
                    Рекомендации для студента (самостоятельная работа)
                  </h4>
                  <div className='collapse-content'>
                    {collapse_s}
                  </div>
                </div>
                <div className='collapse collapse-arrow bg-base-200'
                >
                  <input
                    type='checkbox'
                    name='my-accordion'
                  />
                  <div className='collapse-title text-xl font-medium '>
                    Рекомендации для преподавателя
                  </div>
                  <div className='collapse-content '>
                    {collapse_t}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </MyModal>
    </>
  );
};
MenuItem.propTypes = {
  id:PropTypes.number,
  title: PropTypes.string,
  desk: PropTypes.string,
  supdesk: PropTypes.string,
  img: PropTypes.string,
  link: PropTypes.string,
  collapse_s:PropTypes.node,
  collapse_t:PropTypes.node,
};
export default MenuItem;

