import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import React from "react";
const MyModal = ({ visible, children, setModal ,index }) => {
  const cancelButtonRef = useRef(null);
  
  if (!visible) return null;
  const handleOnClose = () => {
    setModal(prev => {
      if (typeof prev === 'boolean') {
        return false; // or whatever makes sense in your logic
      }
      
      const newMap = new Map(prev);
      newMap.delete(index);  
      return newMap;
    });
    
  }
  return (
    <Transition.Root
      show={visible}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10 text-black'
        initialFocus={cancelButtonRef}
        onClose={handleOnClose}
      >
        <div className='fixed inset-0 bg-blue-600 bg-opacity-75 backdrop-blur-sm transition-opacity' />

        <div className='fixed inset-0 z-10 flex justify-center'>
          <div className='flex flex-col min-h-full items-center justify-center text-center p-4 w-3/4'>
            <div className='w-full relative flex justify-end'>
              <button
                type='button'
                className='inline-flex -mr-6 w-auto justify-center rounded-t rounded-b-none bg-gray p-1 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-100 relative outline-none'
                onClick={handleOnClose}
                ref={cancelButtonRef}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-12 h-12 bg-white rounded-full transition-all duration-100 hover:bg-blue-200 hover:rotate-180 absolute -top-3 right-1.5 z-20 hover:text-white'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MyModal;
