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
    answer,
    localMultyCheck,
    doMultyCheck,
  } = useQuestionsStepper();
  const [userValues, setUserValues] = useState();
  const [checkedState, setCheckedState] = useState();
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
    setUserValues(optimizedValue);

    // console.log(`Данные ОТВЕТОВ TEXT`,index, userValues);
    // console.log(`Данные Проверки ОТВЕТОВ TEXT`,userValues.map((s, index) => {
    //   if (!s || !s.value) {
    //     return false;
    //   }
    //   return qStore[index] ? s.value === qStore[index].answer : false;
    // }));
  };
  const resetValues = () => {
    setUserValues([]);
    setCheckedState([]);
  };
  useEffect(() => {
    newCheckedState = userValues === qStore[index].answer ? true : false;
    setCheckedState(newCheckedState);
    // console.log('MUlTY CHECK TEXT INPUT',localMultyCheck);
    if (QChecked) {
      if (newCheckedState.length !== 0 && newCheckedState) {
        Store === useQuestions
          ? (answerQuestion(QStore[QuestionStore]),
            getScore(QStore[QuestionStore].value),
            useScore.setState((state) => ({
              attempt: state.attempt - 1,
            })),
            console.log('CORRECT ANSWER'))
          : Store === useQuestionsStepper
          ? (addUserAnswer(QuestionStore, newCheckedState, index),
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
          ? (addUserAnswer(QuestionStore, false, index),
            console.log('UNCORRECT ANSWER STEPPER', answer))
          : null;
      }
    }
    if (!QChecked) {
      resetValues();
      document.getElementsByTagName('input')[index].value = '';
    }
  }, [QChecked, localMultyCheck]);

  return (
    <input
      autoComplete='off'
      disabled={isDisabled}
      onChange={!isDisabled ? (event) => handleInput(event, index) : null}
      type='text'
      id={index}
      placeholder='Заполните пропуск'
      className={`min-w-52 w-fit m-auto py-1 border-b-2 text-sm text-gray-900 border-gray-300 rounded-sm focus:ring-blue-500 focus-visible:outline-blue-300 text-center ${classNames} ${
        isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'
      } ${
        QChecked === false
          ? 'border-gray-300'
          : checkedState === undefined
          ? 'border-gray-300'
          : checkedState
          ? 'border-green-100 bg-green-100 focus-visible:outline-green-100 text-white'
          : 'border-red-100 bg-red-100 text-white focus-visible:outline-red-100'
      } `}
    />
  );
};
