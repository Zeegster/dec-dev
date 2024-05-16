import { Checkbox } from 'react-daisyui';
import { useQuestions, useScore } from '../store/Store';
import { useQuestionsStepper } from '../store/StoreStepper';
import { useEffect, useState } from 'react';
import React from "react";
export const SelectInput = ({
  QuestionStore,
  QuestionIndex,
  classNames = '',
  Store = useQuestionsStepper,
}) => {
  const { QStore } = Store();

  const {
    QChecked,
    isDisabled,
    activeStep,
    answerQuestion,
    unCorrect,
    addUserAnswer,
  } = useQuestionsStepper();
  const [userValues, setUserValues] = useState([]);
  const [checkedState, setCheckedState] = useState([]);

  const qStore = QStore[QuestionStore];

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
        className={`block p-2 mb-2 border-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ${
          isDisabled ? 'cursor-not-allowed' : ''
        } focus:ring-blue-500 focus-visible:outline-blue-300 ${classNames} ${
          QChecked === false
            ? 'border-gray-300'
            : checkedState[qItem.id] === undefined
            ? 'border-gray-300'
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
          className='flex items-center gap-2 w-fit'
        >
          <select
            id={i}
            disabled={isDisabled}
            onChange={(event) => handleSelectChange(i, event.target.value)}
            className={`block p-2 mb-2 border-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus-visible:outline-blue-300 ${classNames} ${
              isDisabled ? 'cursor-not-allowed' : ''
            } ${
              QChecked === false
                ? 'border-gray-300'
                : checkedState[i] === undefined
                ? 'border-gray-300'
                : checkedState[i] === true
                ? 'border-green-100 bg-green-100 focus-visible:outline-green-100 text-white'
                : 'border-red-100 bg-red-100 text-white focus-visible:outline-red-100'
            }`}
          >
            <option>Ваш ответ</option>
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

export const TextInput = ({
  QuestionStore,
  index = 0,
  classNames = '',
  Store = useQuestionsStepper,
}) => {
  const { QStore } = Store();
  const { answerQuestion, unCorrect } = useQuestions();
  const { getScore } = useScore();
  const { QChecked, setDisabledState, isDisabled, addUserAnswer, checkCount } =
    useQuestionsStepper();
  const [userValues, setUserValues] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  let qStore = [];
  if (Store === useQuestionsStepper) {
    qStore = [...QStore[QuestionStore]];
  } else {
    qStore = [...QStore[QuestionStore].options];
  }
  const handleInput = (value, index) => {
    const optimizedValue = value.toLowerCase().replace(/ /g, '');
    setUserValues((prev) => {
      const copy = [...prev];
      copy[index] = { index, value: optimizedValue };
      return copy;
    });
  };

  const resetValues = () => {
    setUserValues([]);
    setCheckedState([]);
  };

  console.log(QChecked);
  useEffect(() => {
    // clean text input on reset

    if (QChecked !== false) {
      const newCheckedState = userValues.map((s, index) => {
        if (!s || !s.value) {
          return false;
        }
        return qStore[index] ? s.value === qStore[index].answer : false;
      });
      setCheckedState(newCheckedState);

      if (Object.values(newCheckedState).length === 0) {
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
      document.getElementsByTagName('input')[index].value = '';
    }
  }, [QChecked]);

  return (
    <input
      disabled={isDisabled}
      onChange={
        !isDisabled ? (event) => handleInput(event.target.value, index) : null
      }
      type='text'
      id={index}
      placeholder='Заполните пропуск'
      className={` m-auto py-1 border-b-2 text-sm text-gray-900 border-gray-300 rounded-sm focus:ring-blue-500 focus-visible:outline-blue-300 text-center ${classNames} ${
        isDisabled ? 'bg-gray-300 cursor-not-allowed' : ''
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

export function QCheckBox({
  index,
  classNames = '',
  labelClassNames = '',
  Store = useQuestionsStepper,
}) {
  const { QStore } = Store();

  const { QChecked, isDisabled, addUserAnswer, setDisableButton } =
    useQuestionsStepper();

  // Хранилище ответов
  let qStore = QStore[index];
  // Хранилище пользовательских данных
  const [userCheck, setUserCheck] = useState([]);
  let checkedState = [];
  useEffect(() => {
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
      } else {
        const allTrue = Object.values(checkedState).every(
          (value) => value === true
        );
        allTrue ? addUserAnswer(index, allTrue) : addUserAnswer(index, allTrue);
      }
    }
    console.log(userCheck);
  }, [QChecked]);
  const handleCheck = (event, index) => {
    // Create a copy of the userCheck array
    let updatedUserCheck = [...userCheck];
    // Update the specific index with the new checked status
    let checkID = event.target.id;
    updatedUserCheck[index] = event.target.checked;
    // Set the state with the updated array
    setUserCheck(updatedUserCheck); // Update the state
    console.log(userCheck);
  };

  const matches = (state) => {
    if (state !== false && userCheck) {
      checkedState = [];
      userCheck.map((u, index) => {
        u === undefined
          ? (checkedState[index] = undefined)
          : (u === true) === qStore[index].answer
          ? { ...(checkedState[index] = true) }
          : !u === (qStore[index].answer === false)
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
            className={`mx-2 ${
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

export const MyDragList = ({
  QuestionStore,
  listOneClassNames = '',
  listTwoClassNames = '',
  wrapperClassNames = '',
  Store = useQuestionsStepper,
}) => {
  const { QStore } = Store();
  const { answerQuestion, unCorrect } = useQuestions();
  const { getScore } = useScore();
  const { QChecked, isDisabled, addUserAnswer, answer } = useQuestionsStepper();
  // const [staticList, setStaticList ] = useState([])
  // console.log(QStore[QuestionStore])
  let qStoreCopy = [];
  if (Store === useQuestionsStepper) {
    qStoreCopy = [...QStore[QuestionStore]];
  } else {
    qStoreCopy = [...QStore[QuestionStore].options];
  }

  let indexAnswer = qStoreCopy.findIndex((item) =>
    item.hasOwnProperty('answer')
  );

  if (indexAnswer !== -1) {
    qStoreCopy.splice(indexAnswer, 1);
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const qStore = shuffleArray([...qStoreCopy]);
  let checkedState = [];

  const [cardList, setCardList] = useState(qStore);
  const [currentCard, setCurrentCard] = useState(null);
  useEffect(() => {
    if (!QChecked) {
      const shuffledList = shuffleArray([...qStoreCopy]);
      setCardList(
        shuffledList.map((item, index) => ({
          ...item,
          order: index,
        }))
      );
    }
    if (QChecked) {
      if (Object.values(checkedState).length === 0) {
        addUserAnswer(QuestionStore, false);
        unCorrect(QStore[QuestionStore]);
      }
      if (
        Store === useQuestions &&
        Object.values(checkedState).every((value) => value === true)
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
        Object.values(checkedState).some((value) => value === false)
      ) {
        unCorrect(QStore[QuestionStore]);
        useScore.setState((state) => ({
          attempt: state.attempt - 1,
        }));
        console.log('UNCORRECT ANSWER');
      } else {
        const allTrue = Object.values(checkedState).every(
          (value) => value === true
        );
        addUserAnswer(QuestionStore, allTrue);
      }
    }
  }, [QChecked, addUserAnswer]);

  const compareOrder = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((value, index) => value === arr2[index]);
  };

  const matches = (state) => {
    // console.log('MATCHES INIT');
    if (state !== false && currentCard) {
      // Функция сортировки списков по полю order
      const sortCards = (a, b) => {
        if (a.order > b.order) {
          return 1;
        } else {
          return -1;
        }
      };
      // Создаем отсортированный список для дальнейшего сравнения
      const sortedcardList = cardList.sort(sortCards);
      // Проверка соответствия
      const answers =
        Store === useQuestions
          ? QStore[QuestionStore].options.find((item) =>
              item.hasOwnProperty('answer')
            ).answer
          : QStore[QuestionStore].find((item) => item.hasOwnProperty('answer'))
              .answer;

      // Use the compareOrder function to compare the order of elements
      const isOrderSame = compareOrder(
        sortedcardList.map((item) => item.text),
        answers
      );

      // If the order is the same, set all elements in checkedState to true
      if (isOrderSame) {
        checkedState = sortedcardList.map(() => true);
      } else {
        // If the order is not the same, check each element individually
        sortedcardList.forEach((item, index) => {
          checkedState[index] = item.text === answers[index];
        });
      }

      return checkedState;
    }
  };

  matches(QChecked);

  function dragStartHandler(e, card) {
    setCurrentCard(card);
  }
  function dragLeaveHandler(e, card) {}

  function dragEndHandler(e, card) {}
  function dragOverHandler(e, card) {
    e.preventDefault();
  }
  function dropHandler(e, card) {
    e.preventDefault();
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };
  return (
    <>
      {' '}
      <div className={`flex w-full h-min ${wrapperClassNames}`}>
        {qStoreCopy.find((q) => q.textorder) && (
          <ul
            className={`h-full flex flex-col justify-center items-center ${wrapperClassNames}`}
          >
            {qStoreCopy
              .filter((q) => q.textorder)
              .map((q, index) => {
                return (
                  <li
                    key={q.id}
                    className={`p-2 border flex justify-center items-center mb-2 h-fit w-full text-sm cursor-grab ${listOneClassNames} ${
                      QChecked === false
                        ? 'border-gray-300'
                        : checkedState[index] === undefined
                        ? 'border-gray-300'
                        : checkedState[index]
                        ? 'border-green-100 bg-green-100 focus-visible:outline-green-1 cursor-not-allowed'
                        : 'border-red-100 bg-red-100 focus-visible:outline-red-100 cursor-not-allowed'
                    } `}
                  >
                    <span>{q.textorder}</span>
                  </li>
                );
              })}
          </ul>
        )}
        <ul
          className={`h-full flex flex-col justify-between items-center ${wrapperClassNames}`}
        >
          {cardList.sort(sortCards).map((card, index) => (
            <li
              onDragStart={
                !isDisabled ? (e) => dragStartHandler(e, card) : null
              }
              onDragLeave={!isDisabled ? (e) => dragLeaveHandler(e) : null}
              onDragEnd={!isDisabled ? (e) => dragEndHandler(e) : null}
              onDragOver={!isDisabled ? (e) => dragOverHandler(e) : null}
              onDrop={!isDisabled ? (e) => dropHandler(e, card) : null}
              key={index}
              draggable={true}
              className={`p-2 border block justify-start items-center h-fit w-fit mb-2 text-sm cursor-grab ${listTwoClassNames} ${
                QChecked === false
                  ? 'border-gray-300'
                  : checkedState[index] === undefined
                  ? 'border-gray-300'
                  : checkedState[index]
                  ? 'border-green-100 bg-green-100 focus-visible:outline-green-1 cursor-not-allowed'
                  : 'border-red-100 bg-red-100 focus-visible:outline-red-100 cursor-not-allowed'
              }`}
            >
              {card.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
