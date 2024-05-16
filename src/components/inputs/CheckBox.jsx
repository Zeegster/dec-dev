import { Checkbox } from 'react-daisyui';
import { useQuestions, useScore } from '../../store/Store';
import { useQuestionsStepper } from '../../store/StoreStepper';
import React,{ useEffect, useState } from 'react';

export function QCheckBox({
  index,
  classNames = '',
  labelClassNames = '',
  Store = useQuestionsStepper,
}) {
  const { QStore } = Store();
  const { answerQuestion, unCorrect } = useQuestions();
  const { getScore } = useScore();

  const { QChecked, isDisabled, addUserAnswer, setDisableButton } =
    useQuestionsStepper();

  // Хранилище ответов
  let qStore = [];
  if (Store === useQuestionsStepper) {
    qStore = [...QStore[index]];
  } else {
    qStore = [...QStore[index].options];
  }
  // Хранилище пользовательских данных
  const [userCheck, setUserCheck] = useState([]);
  let checkedState = [];
  const handleCheck = (event, index) => {
    let updatedUserCheck = [...userCheck];

    event.target.checked === false
      ? (updatedUserCheck[index] = undefined)
      : (updatedUserCheck[index] = {
          id: qStore[index].id,
          value: event.target.checked,
        });
    // Create a copy of the userCheck array
    // Update the specific index with the new checked status
    // Set the state with the updated array
    setUserCheck(updatedUserCheck); // Update the state
  };
  useEffect(() => {
    const result = checkedState.filter((q) => q === false).toLocaleString()
      ? 'false'
      : checkedState
          .filter((c) => c.value === true)
          .map((c) => c.id)
          .toLocaleString() ===
        qStore
          .filter((q) => q.answer === true)
          .map((q) => q.id)
          .toLocaleString()
      ? 'true'
      : 'false';

    const booleanResult = result === 'true';

    if (!QChecked) {
      checkedState = [];
      setUserCheck([]);
      let checkbox = document.getElementsByTagName('input');
      for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
      }
    }
    if (QChecked) {
      if (Object.values(userCheck).length === 0) {
        addUserAnswer(index, false);

        if (Store === useQuestions) {
          unCorrect(QStore[index]);

          useScore.setState((state) => ({
            attempt: state.attempt - 1,
          }));
        }
        console.log('UNCORRECT ANSWER 0');
      }
      if (Store !== useQuestions) {
        const allTrue = booleanResult;

        addUserAnswer(index, allTrue);
        console.log('ANSWER STEPPER', allTrue);
      }
      if (Store === useQuestions && booleanResult) {
        answerQuestion(QStore[index]);
        getScore(QStore[index].value);
        useScore.setState((state) => ({
          attempt: state.attempt - 1,
        }));
        console.log('CORRECT ANSWER');
      }
      if (
        Store === useQuestions &&
        Object.values(checkedState).some((value) => value === false)
      ) {
        unCorrect(QStore[index]);
        useScore.setState((state) => ({
          attempt: state.attempt - 1,
        }));
        console.log('UNCORRECT ANSWER');
      }
    }
    console.log('Use Effect userValues CheckBox', userCheck);
  }, [QChecked, setUserCheck]);

  const matches = (state) => {
    if (state !== false && userCheck) {
      checkedState = [];
      // Map over the userCheck array
      // check id and indexes to match with qStore
      // if match then set checkedState[index] with id to true
      // else set checkedState[index] with id to false
      userCheck.map((u, index) => {
        u === undefined
          ? null
          : (u.id === qStore[index].id && u.value === true) ===
            qStore[index].answer
          ? { ...(checkedState[index] = { id: u.id, value: u.value }) }
          : !u.value === (qStore[index].answer === false)
          ? (checkedState[index] = undefined)
          : { ...(checkedState[index] = false) };
      });

      return checkedState;
    }
  };
  matches(QChecked);

  return (
    <>
      {qStore.map((item, index) => (
        <label
          key={index}
          className={`inline-flex items-center text-left cursor-pointer ${labelClassNames}`}
        >
          <Checkbox
            id={item.id}
            type='checkbox'
            value={item.answer}
            disabled={isDisabled}
            onChange={!isDisabled ? (e) => handleCheck(e, index) : null}
            color={
              QChecked === false
                ? 'neutral'
                : checkedState[index] === undefined
                ? 'neutral'
                : checkedState[index] !== false
                ? 'success'
                : 'error'
            }
            className={`mx-2 border-2 rounded-sm ${
              QChecked === false
                ? 'neutral'
                : checkedState[index] === undefined
                ? 'neutral'
                : checkedState[index] !== false
                ? 'border-2 !bg-green-100 !opacity-100 text-black'
                : 'border-2 !bg-red-100 !opacity-100'
            } ${classNames}`}
          />{' '}
          <p>{item.text}</p>
        </label>
      ))}{' '}
    </>
  );
}

// CHECKERS

// console.log("Данные пользователя",userCheck);
//     console.log("Данные Вопроса",qStore);
//     console.log('Данные Хранилища',checkedState.filter((q)=>q===false));
//     console.log('Данные True в поле answer qStore',qStore.filter((q)=>q.answer===true).map((q)=>q.id).toLocaleString());
//     console.log('Данные CheckedState и qStore', ((checkedState.filter((q)=>q===false)).toLocaleString()  ? 'false' :(checkedState.filter((c) => c.value === true).map((c) => c.id).toLocaleString() === qStore.filter((q) => q.answer === true).map((q) => q.id).toLocaleString())?'true':'false'));
