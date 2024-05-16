import { useQuestions, useScore } from '../../store/Store';
import { useQuestionsStepper } from '../../store/StoreStepper';
import { useEffect, useState } from 'react';
import React from 'react';

export const SelectInput = ({
  QuestionStore,
  QuestionIndex,
  classNames = '',
  wrapperClassNames = '',
  labelClassNames = '',
  Store = useQuestionsStepper,
}) => {
  const { QStore } = Store();
  const { answerQuestion, unCorrect } = useQuestions();
  const { getScore } = useScore();

  const { QChecked, isDisabled, addUserAnswer } = useQuestionsStepper();
  const [userValues, setUserValues] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  let qStore = [];
  if (Store === useQuestionsStepper) {
    qStore = [...QStore[QuestionStore]];
  } else {
    qStore = [...QStore[QuestionStore].options];
  }

  const resetValues = () => {
    setUserValues([]);
    setCheckedState([]);
    // Clear the selected options
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach((selectElement) => {
      selectElement.selectedIndex = 0;
    });
  };

  const handleSelectChange = (selectedIndex, selectedValue) => {
    setUserValues((prevUserValues) => ({
      ...prevUserValues,
      [selectedIndex]: selectedValue,
    }));
  };

  useEffect(() => {
    if (QChecked !== false) {
      const newCheckedState = Object.keys(userValues).reduce((acc, curr) => {
        acc[curr] = userValues[curr] === qStore[parseInt(curr)].answer;
        return acc;
      }, {});
      console.log(newCheckedState);
      setCheckedState(newCheckedState);

      if (Object.keys(newCheckedState).length === 0) {
        addUserAnswer(QuestionStore, false);
        unCorrect(QStore[QuestionStore]);
      }
      if (
        Store === useQuestions &&
        Object.values(newCheckedState).every((value) => value === true)
      ) {
        answerQuestion(QStore[QuestionStore]);
        getScore(QStore[QuestionStore].value);
        useScore.setState((state) => ({
          attempt: state.attempt - 1,
        }));
        console.log('CORRECT ANSWER');
      }
      if (
        Store === useQuestions &&
        Object.values(newCheckedState).some((value) => value === false)
      ) {
        unCorrect(QStore[QuestionStore]);
        useScore.setState((state) => ({
          attempt: state.attempt - 1,
        }));
        console.log('UNCORRECT ANSWER');
      } else {
        const allTrue = Object.values(newCheckedState).every(
          (value) => value === true
        );
        allTrue
          ? addUserAnswer(QuestionStore, allTrue)
          : addUserAnswer(QuestionStore, allTrue);
      }
    }
    if (!QChecked) {
      resetValues();
    }
  }, [QChecked]);

  if (QuestionIndex !== undefined) {
    const qItem = qStore[QuestionIndex];
    return (
      <select
        disabled={isDisabled}
        key={qItem.id}
        id={qItem.id}
        onChange={(event) =>
          handleSelectChange(event.target.id, event.target.value)
        }
        className={`block p-2 mb-2 border-2 text-sm text-gray-900 border rounded-sm bg-gray-50 focus:ring-blue-200 focus-visible:outline-blue-300 ${classNames} ${
          isDisabled ? 'cursor-not-allowed' : ''
        } ${
          QChecked === false
            ? 'border-blue-200'
            : checkedState[qItem.id] === undefined
            ? 'border-blue-200'
            : checkedState[qItem.id] === true
            ? 'border-green-100 bg-green-100 focus-visible:outline-green-100 text-white'
            : 'border-red-100 bg-red-100 text-white focus-visible:outline-red-100'
        }`}
      >
        <option>Ваш ответ</option>
        {qItem.text.map((option, j) => (
          <option
            key={j}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    return qStore.map((q, i) => {
      return (
        <li
          key={q.id}
          className={`flex items-center w-fit ${wrapperClassNames}`}
        >
          {q.label && <p className={`text-center mr-2 ${labelClassNames}`}>{q.label}</p>}
          <select
            id={i}
            disabled={isDisabled}
            onChange={(event) => handleSelectChange(i, event.target.value)}
            className={`block p-2 mb-2 border-b-2 text-sm text-gray-900 outline-2 rounded-sm  bg-blue-50 bg-opacity-20 focus:ring-blue-500 focus-visible:outline-blue-300 active:outline-blue-700  ${classNames} ${
              isDisabled ? 'cursor-not-allowed' : ''
            } ${
              QChecked === false
                ? 'border-blue-200'
                : checkedState[i] === undefined
                ? 'border-blue-200'
                : checkedState[i] === true
                ? 'border-green-100 bg-green-100 !bg-opacity-100 focus-visible:outline-green-100 text-white'
                : 'border-red-100 bg-red-100 !bg-opacity-100 focus-visible:outline-red-100 text-white'
            }`}
          >
            <option>Выберите ответ</option>
            {q.text.map((option, j) => {
              return (
                <option
                  key={j}
                  value={option}
                >
                  {option}
                </option>
              );
            })}
          </select>
        </li>
      );
    });
  }
};
