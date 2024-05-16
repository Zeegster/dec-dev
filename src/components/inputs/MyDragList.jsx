import { useQuestions, useScore } from '../../store/Store';
import { useQuestionsStepper } from '../../store/StoreStepper';
import { useEffect, useState } from 'react';
import React from 'react';

export const MyDragList = ({
  QuestionStore,
  listOneClassNames = '',
  listTwoClassNames = '',
  ulOneClassNames = '',
  ulTwoClassNames = '',
  wrapperClassNames = '',
  Store = useQuestionsStepper,
}) => {
  const { QStore } = Store();
  const { answerQuestion, unCorrect } = useQuestions();
  const { getScore } = useScore();
  const { QChecked, isDisabled, addUserAnswer ,answer} = useQuestionsStepper();

  let qStoreCopy = [];
  let initialValue = [];
  if (Store === useQuestionsStepper) {
    qStoreCopy = [...QStore[QuestionStore]];
    initialValue = [...QStore[QuestionStore]];
  } else {
    qStoreCopy = [...QStore[QuestionStore].options];
    initialValue = [...QStore[QuestionStore].options];
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
    

    const booleanResult = checkedState.every((value) => value === true);

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
      if (checkedState.length !== 0 && booleanResult) {
        Store === useQuestions
          ? (answerQuestion(QStore[QuestionStore]),
            getScore(QStore[QuestionStore].value),
            useScore.setState((state) => ({
              attempt: state.attempt - 1,
            })),
            console.log('CORRECT ANSWER'))
          : Store=== useQuestionsStepper?(addUserAnswer(QuestionStore, booleanResult),          console.log('CORRECT ANSWER STEPPER', answer)):null;
          
      } else {
        Store === useQuestions
          ? (unCorrect(QStore[QuestionStore]),
            useScore.setState((state) => ({
              attempt: state.attempt - 1,
            })),
            console.log('UNCORRECT ANSWER'))
          : Store=== useQuestionsStepper?(addUserAnswer(QuestionStore, false),          console.log('UNCORRECT ANSWER STEPPER', answer)):null;
      }
    }
  }, [QChecked]);

  const compareOrder = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    return arr1.every((value, index) => value === arr2[index]);
  };

  const matches = (state) => {
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
      <div className={`flex w-fit h-fit  ${wrapperClassNames}`}>
        {/* Static list */}
        {qStoreCopy.find((q) => q.textorder) && (
          <ul className={`flex flex-col ${ulOneClassNames}`}>
            {qStoreCopy
              .filter((q) => q.textorder)
              .map((q, index) => {
                return (
                  <li
                    key={q.id}
                    className={`p-2 border flex justify-center items-center mb-2 h-fit w-full text-sm cursor-default ${listOneClassNames} ${
                      QChecked === false
                        ? 'border-gray-300'
                        : checkedState[index] === undefined
                        ? 'border-gray-300'
                        : checkedState[index]
                        ? 'border-green-100 bg-green-100 focus-visible:outline-green-1 cursor-not-allowed !bg-opacity-100 text-white'
                        : 'border-red-100 bg-red-100 focus-visible:outline-red-100 cursor-not-allowed !bg-opacity-100 text-white'
                    } `}
                  >
                    <span>{q.textorder}</span>
                  </li>
                );
              })}
          </ul>
        )}
        <ul className={`flex flex-col ${ulTwoClassNames}`}>
          {/* Draggable list */}
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
              className={`p-2 flex border justify-start items-center h-fit w-fit mb-2 text-sm cursor-grab ${listTwoClassNames} ${
                QChecked === false
                  ? 'border-gray-300'
                  : checkedState[index] === undefined
                  ? 'border-gray-300'
                  : checkedState[index]
                  ? 'border-green-100 bg-green-100 focus-visible:outline-green-1 cursor-not-allowed !bg-opacity-100 text-white'
                  : 'border-red-100 bg-red-100 focus-visible:outline-red-100 cursor-not-allowed !bg-opacity-100 text-white'
              }`}
            >
              <span>{card.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};


// CHECKERS

// console.log('1.Данные пользователя');
// console.log('2.Данные Вопроса', initialValue);
// console.log('3.Данные Хранилища', checkedState);
// console.log('4.Данные True в поле answer qStore', qStoreCopy);
// console.log(
//   '5.Данные CheckedState и qStore',
//   checkedState.every((value) => value === true)
// );