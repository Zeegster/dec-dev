import { useQuestions, useScore } from '../../store/Store';
import { useQuestionsStepper } from '../../store/StoreStepper';
import { useEffect, useState } from 'react';
import React from 'react';

export const TextInput = ({
  QuestionStore,
  index = 0,
  classNames = '',
  Store = useQuestionsStepper,
}) => {
  const { QStore } = Store();
  const { answerQuestion, unCorrect } = useQuestions();
  const { getScore } = useScore();
  const {
    QChecked,
    setDisabledState,
    isDisabled,
    addUserAnswer,
    answer,localMultyCheck,doMultyCheck
  } = useQuestionsStepper();
  const [userValues, setUserValues] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  let qStore = [];
  if (Store === useQuestionsStepper) {
    qStore = [...QStore[QuestionStore]];
  } else {
    qStore = [...QStore[QuestionStore].options];
  }
    let newCheckedState = [];

  const handleInput = (event, index) => {
    const optimizedValue = event.target.value.toLowerCase().replace(/ /g, '');
    // console.log('Event Target ID', event.target.value);
    setUserValues((prev) => {
      const copy = [...prev];
      copy[index] = { index, value: optimizedValue };
      return copy;
    });

    console.log(`Данные ОТВЕТОВ TEXT`,index, userValues);
    console.log(`Данные Проверки ОТВЕТОВ TEXT`,userValues.map((s, index) => {
      if (!s || !s.value) {
        return false;
      }
      return qStore[index] ? s.value === qStore[index].answer : false;
    }));

  };

  const resetValues = () => {
    setUserValues([]);
    setCheckedState([]);
  };
  
  useEffect(() => {
    // console.log('MUlTY CHECK TEXT INPUT',localMultyCheck);
    
  newCheckedState = userValues.map((s, index) => {
    if (!s || !s.value) {
      return false;
    }
    return qStore[index] ? s.value === qStore[index].answer : false;
  });
  setCheckedState(newCheckedState);
    if (QChecked) {

      const booleanResult = Store === useQuestions?checkedState.some((value) => value === true):checkedState.every((value) => value === true);

      if (newCheckedState.length !== 0 && booleanResult) {
        Store === useQuestions
          ? (answerQuestion(QStore[QuestionStore]),
            getScore(QStore[QuestionStore].value),
            useScore.setState((state) => ({
              attempt: state.attempt - 1,
            })),
            console.log('CORRECT ANSWER'))
          : Store === useQuestionsStepper
          ? (addUserAnswer(QuestionStore, booleanResult,index),
            console.log('CORRECT ANSWER STEPPER', answer))
          : null;
      } else {
        Store === useQuestions
          ? (unCorrect(QStore[QuestionStore]),
            useScore.setState((state) => ({
              attempt: state.attempt - 1,
            })),
            console.log('UNCORRECT ANSWER'))
          : Store === useQuestionsStepper
          ? (addUserAnswer(QuestionStore, false,index),
            console.log('UNCORRECT ANSWER STEPPER', answer))
          : null;
      }
    }
    if (!QChecked) {
      resetValues();
      document.getElementsByTagName('input')[index].value = '';
    }
  }, [QChecked,localMultyCheck]);

  return (
    <input
     autoComplete='off'
      disabled={isDisabled}
      onChange={
        !isDisabled ? (event) => handleInput(event, index) : null
      }
      type='text'
      id={index}
      placeholder='Заполните пропуск'
      className={`min-w-52 w-fit m-auto py-1 border-b-2 text-sm text-gray-900 border-gray-300 rounded-sm focus:ring-blue-500 focus-visible:outline-blue-300 text-center ${classNames} ${
        isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'
      } ${
        QChecked === false
          ? 'border-gray-300'
          : checkedState[index] === undefined
          ? 'border-gray-300'
          : checkedState[index]
          ? 'border-green-100 bg-green-100 focus-visible:outline-green-100 text-white'
          : 'border-red-100 bg-red-100 text-white focus-visible:outline-red-100'
      } `}
    />
  );
};
