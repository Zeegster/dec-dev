import React, { useState } from "react";
import { SimulatorPageContent } from "../store/content/SimulatorPageContent";

export const InputWithBlank = ({
  index,
  correctAnswer,
  width,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [results, setResults] = useState()
  console.log(results);
  
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  function checkAnswers() {
    // правильные ответы
    const correctAnswers = {
      1: "ответ 1",
      2: "ответ 2",
      3: "ответ 3",
    };

    // сравниваем ответы
    const results = {};

    Object.keys(answers).forEach((key) => {
      const userAnswer = answers[key];
      const correctAnswer = correctAnswers[key];

      results[key] =
        userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    });

    // выводим результат
    setResults(results);
  }
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border-2 rounded-xl focus:outline-none p-1 ${width}  ${
          isValid === null ? "" : isValid ? "bg-green-100" : "bg-red-100 "
        }`}
      />
      <button className="relative" onClick={checkAnswers}>
        <svg
          className="absolute -bottom-1 right-2"
          width={20}
          enable-background="new 0 0 40 40"
          id="layer1"
          version="1.1"
          viewBox="0 0 40 40"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path d="M20,25.3c-0.6,0-1-0.4-1-1v-4.4c0-0.6,0.4-1,1-1c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4c0,0.6-0.4,1-1,1s-1-0.4-1-1   c0-3.3,2.7-6,6-6s6,2.7,6,6c0,3-2.2,5.4-5,5.9v3.5C21,24.9,20.6,25.3,20,25.3z" />
          </g>
          <g>
            <path d="M20,40C9,40,0,31,0,20S9,0,20,0c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2C27.9,3.3,24,2,20,2   C10.1,2,2,10.1,2,20s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4c0.5-0.3,1.1-0.1,1.4,0.3   C39,12.9,40,16.4,40,20C40,31,31,40,20,40z" />
          </g>
          <g>
            <path d="M20,32.5c-0.6,0-1-0.4-1-1v-2.7c0-0.6,0.4-1,1-1s1,0.4,1,1v2.7C21,32.1,20.6,32.5,20,32.5z" />
          </g>
        </svg>
      </button>
    </>
  );
};

// export const InputWithBlank = ({ index, correctAnswer, width }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [isValid, setIsValid] = useState(null);

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleCheckButtonClick = () => {
//     const isValidAnswer =
//       inputValue.replaceAll(" ", "").toLowerCase() ===
//       correctAnswer.toLowerCase();
//       setIsValid(isValidAnswer);
//       console.log(isValidAnswer);
//   };
//   return (
//     <>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleChange}
//         className={`border-2 rounded-xl focus:outline-none p-1 ${width}  ${
//           isValid === null ? "" : isValid ? "bg-green-100" : "bg-red-100 "
//         }`}
//       />
//       <button className="relative" onClick={handleCheckButtonClick}>
//         <svg
//           className="absolute -bottom-1 right-2"
//           width={20}
//           enable-background="new 0 0 40 40"
//           id="layer1"
//           version="1.1"
//           viewBox="0 0 40 40"
//           xml:space="preserve"
//           xmlns="http://www.w3.org/2000/svg"
//           xmlns:xlink="http://www.w3.org/1999/xlink"
//         >
//           <g>
//             <path d="M20,25.3c-0.6,0-1-0.4-1-1v-4.4c0-0.6,0.4-1,1-1c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4c0,0.6-0.4,1-1,1s-1-0.4-1-1   c0-3.3,2.7-6,6-6s6,2.7,6,6c0,3-2.2,5.4-5,5.9v3.5C21,24.9,20.6,25.3,20,25.3z" />
//           </g>
//           <g>
//             <path d="M20,40C9,40,0,31,0,20S9,0,20,0c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2C27.9,3.3,24,2,20,2   C10.1,2,2,10.1,2,20s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4c0.5-0.3,1.1-0.1,1.4,0.3   C39,12.9,40,16.4,40,20C40,31,31,40,20,40z" />
//           </g>
//           <g>
//             <path d="M20,32.5c-0.6,0-1-0.4-1-1v-2.7c0-0.6,0.4-1,1-1s1,0.4,1,1v2.7C21,32.1,20.6,32.5,20,32.5z" />
//           </g>
//         </svg>
//       </button>
//     </>
//   );
// };
