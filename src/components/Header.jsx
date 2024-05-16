import { useRef, useState } from 'react';
import React from "react";
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import MyModal from './MyModal';
import { image1 } from '../assets/base64/header';
import { useEffect } from 'react';

const Header = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const handleOnClose = () => setModal(false);

  const {infoContent} = data

  return (
    <>
      <header className='flex justify-between items-center py-8 text-white'>
        <div className='flex pl-16 text-xs '>
          <div
            className='flex cursor-pointer group'
            onClick={() => setModal(true)}
          >
            <span className='w-2 h-auto bg-gray-100 mr-2 transition-all duration-200 group-hover:scale-y-125' />
            <h2 className='mr-6 text-sm'>
              Информация <br /> о контенте
            </h2>
          </div>
          <div
            className='flex cursor-pointer group'
            onClick={() => setModal2(true)}
          >
            <span className='w-2 h-auto bg-gray-100 mr-2 transition-all duration-200 group-hover:scale-y-125' />
            <h2 className='text-sm '>
              Ключевые <br /> слова
            </h2>
          </div>
        </div>
        <div className='pr-5 font-semibold'>
          <h1 className='text-2xl text-end font-dela '>
            ЦИФРОВОЙ ОБРАЗОВАТЕЛЬНЫЙ КОНТЕНТ
          </h1>
        </div>
      </header>

      <MyModal
        onClose={handleOnClose}
        visible={modal}
        setModal={setModal}
      >
        <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
          <div className='bg-white p-6'>
            <div className='flex items-start '>
              <div className='text-left space-y-6'>
                <Dialog.Title
                  as='h3'
                  className='text-base font-semibold leading-6 text-blue-400'
                >
                  Информация о контенте:
                </Dialog.Title>
                <div
                  id='info'
                  className='container'
                >
                  {infoContent.info}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </MyModal>

      <MyModal
        onClose={handleOnClose}
        visible={modal2}
        setModal={setModal2}
      >
        <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
          <div className='bg-white p-6'>
            <div className='flex items-start'>
              <div className=' text-sm mt-0 text-left space-y-6'>
                <Dialog.Title
                  as='h3'
                  className='font-semibold text-base leading-6 text-blue-400'
                >
                  Ключевые слова:
                </Dialog.Title>
                <div
                  className='container '
                  id='keyWords'
                >
                  {infoContent.keyWords}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </MyModal>
    </>
  );
};

export default Header;
