import { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import MyModal from '../MyModal';
import React from "react";

import { Dialog } from '@headlessui/react';
import { useRef } from 'react';

import { InfographicPageContent } from '../../store/content/InfographicPageContent';

const MenuList = () => {
  const [modal, setModal] = useState(new Map());

  return (
    <>
      <div className='w-full text-black'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex m-auto justify-center flex-wrap gap-4'>
            {InfographicPageContent.items.map((item) => {
              return (
                <MenuItem
                  key={item.id}
                  setModal={setModal}
                  title={item.title}
                  index={item.id}
                  image={item.titleImage}
                />
              );
            })}
          </div>
        </div>
      </div>

      {InfographicPageContent.items.map((item) => {
        return (
          <MyModal
            key={item.id}
            index={item.id}
            visible={modal.has(item.id)}
            setModal={setModal}
          >
            <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
              <div className='bg-white h-full'>
                <div className='h-full flex'>
                  <div className='w-11/12 text-left space-y-6 h-full'>
                    <div className='container '>
                      <div
                        className='p-8 w-full'
                        style={{
                          fontSize: '18px',
                          lineHeight: '1.5',
                        }}
                      >
                      <Dialog.Title
                  as='h2'
                  className='font-bold text-2xl leading-6 mb-6'
                >
                  {item.title}
                </Dialog.Title>
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </MyModal>
        );
      })}
    </>
  );
};
// const [modal, setModal] = useState(false);
// const [modal2, setModal2] = useState(false);
// const [modal3, setModal3] = useState(false);
// const [modal4, setModal4] = useState(false);
// const [modal5, setModal5] = useState(false);
// const [modal6, setModal6] = useState(false);
// const [modal7, setModal7] = useState(false);
// const [modal8, setModal8] = useState(false);
// const [modal9, setModal9] = useState(false);

// return (
//   <>
//     <div className='w-full text-black'>
//       <div className='max-w-7xl mx-auto'>
//         <div className='flex m-auto justify-center flex-wrap gap-4'>
//           <MenuItem
//             setModal={setModal}
//             title={item1.title}
//             index={1}
//             image={item1.titleImage}
//           />
//           <MenuItem
//             setModal={setModal2}
//             title={item2.title}
//             image={item2.titleImage}
//             index={2}
//           />
//           <MenuItem
//             setModal={setModal3}
//             title={item3.title}
//             index={3}
//             image={item3.titleImage}
//           />
//           <MenuItem
//             setModal={setModal4}
//             title={item4.title}
//             index={4}
//             image={item4.titleImage}
//           />
//           <MenuItem
//             setModal={setModal5}
//             title={item5.title}
//             index={5}
//             image={item5.titleImage}
//           />
//         </div>
//       </div>
//     </div>

//     <MyModal
//       onClose={handleOnClose}
//       visible={modal}
//       setModal={setModal}
//     >
//       <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
//         <div className='bg-white h-full'>
//           <div className='h-full flex'>
//             <div className='w-11/12 text-left space-y-6 h-full'>
//               <div className='container '>
//                 <div className="p-8 w-full"
//                   style={{
//                     fontSize: '18px',
//                     lineHeight: '1.5',
//                   }}
//                 >
//                   {item1.content}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Dialog.Panel>
//     </MyModal>

//     <MyModal
//       onClose={handleOnClose}
//       visible={modal2}
//       setModal={setModal2}
//     >
//       <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
//         <div className='bg-white h-full'>
//           <div className='h-full flex'>
//             <div className='w-11/12 text-left space-y-6 h-full'>
//               <div className='container '>
//                 <div className="p-8 w-full"
//                   style={{
//                     fontSize: '18px',
//                     lineHeight: '1.5',
//                   }}
//                 >
//                   {item2.content}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Dialog.Panel>
//     </MyModal>

//     <MyModal
//       onClose={handleOnClose}
//       visible={modal3}
//       setModal={setModal3}
//     >
//       <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
//         <div className='bg-white h-full'>
//           <div className='h-full flex'>
//             <div className='w-11/12 text-left space-y-6 h-full'>
//               <div className='container '>
//                 <div className="p-8 w-full"
//                   style={{
//                     fontSize: '18px',
//                     lineHeight: '1.5',
//                   }}
//                 >
//                   {item3.content}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Dialog.Panel>
//     </MyModal>

//     <MyModal
//       onClose={handleOnClose}
//       visible={modal4}
//       setModal={setModal4}
//     >
//       <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
//         <div className='bg-white h-full'>
//           <div className='h-full flex'>
//             <div className='w-11/12 text-left space-y-6 h-full'>
//               <div className='container '>
//                 <div className="p-8 w-full"
//                   style={{
//                     fontSize: '18px',
//                     lineHeight: '1.5',
//                   }}
//                 >
//                   {item4.content}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Dialog.Panel>
//     </MyModal>

//     <MyModal
//       onClose={handleOnClose}
//       visible={modal5}
//       setModal={setModal5}
//     >
//       <Dialog.Panel className='relative transform w-full h-3/4 overflow-auto rounded-lg bg-white text-left shadow-xl transition-all'>
//         <div className='bg-white h-full'>
//           <div className='h-full flex'>
//             <div className='w-11/12 text-left space-y-6 h-full'>
//               <div className='container '>
//                 <div className="p-8 w-full"
//                   style={{
//                     fontSize: '18px',
//                     lineHeight: '1.5',
//                   }}
//                 >
//                   {item5.content}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Dialog.Panel>
//     </MyModal>

//   </>
// );

export default MenuList;
