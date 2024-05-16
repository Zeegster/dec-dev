import { useEffect } from 'react';
import { useQuestions, useScore, useTimer } from '../store/Store';
import HeaderInner from '../components/HeaderInner';
import HomePageButton from '../components/buttons/HomePageButton';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommonButton from '../components/buttons/CommonButton';
import { useQuestionsStepper } from '../store/StoreStepper';
import { SimulatorPageContent } from '../store/content/SimulatorPageContent';
import React from "react";
function ResultPage() {
  const score = useScore((state) => state.score);
  const { QStore, setActiveStep } = useQuestionsStepper();

  const questions = QStore;
  const { timer } = useTimer();
console.log(questions.length);
  return (
    <div className='text-black'>
      <QuizResults
        score={score}
        totalQuestions={questions.length}
        questions={questions}
        timeSpent={timer}
      />
    </div>
  );
}

function QuizResults({ timeSpent, score, questions }) {
  const { setActiveStep, QCheckedState , QChecked, answer, QStore, clearAnswer } = useQuestionsStepper();

  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/');
  };
  const correctAnswersLength = answer.filter((value) => value.userAnswer === true).length;

  const correctAnswers = useQuestions((state) => state.correctAnswers);
  const unCorrectAnswer = useQuestions((state) => state.unCorrectAnswer);

  const handleClick = () => {
    routeChange();
    setActiveStep(0);
    QChecked && QCheckedState();
    clearAnswer()
  };

  return (
    <div className='flex flex-col justify-between h-full min-h-screen text-white'>
      <HeaderInner title='Результаты теста !' />
      <div className='p-4 max-full mx-auto text-black flex-grow'>

        <div className='bg-white shadow stats flex flex-row rounded-lg divide-x divide-gray-200'>
          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Правильных ответов</div>
            <div className='text-xl font-bold'>{correctAnswersLength} из {QStore.length}</div>
          </div>

          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Процент правильных</div>
            <div className='text-xl font-bold'>
              {Math.round(
                (correctAnswersLength /
                  (QStore.length)) *
                  100
              )}
              %
            </div>
          </div>
        </div>

        <ul className='divide-y divide-gray-200'>
          {answer.map((q,index) => (
            <li
              key={index}
              className={`p-4 ${q.userAnswer===true?'bg-green-100':'bg-red-100'}`}
            >
              <strong className='font-medium'>{SimulatorPageContent.items[q.index].title}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className='w-full h-14 bg-blue-100 flex py-1 pl-12'>
        {/* <CommonButton
          onClick={handleClick}
          text={'Закончить'}
        /> */}
      </div>

      <HomePageButton onClick={handleClick} />
    </div>
  );
}

QuizResults.propTypes = {
  timeSpent: PropTypes.number,
  score: PropTypes.number,
  questions: PropTypes.array,
};

export default ResultPage;


{/* <li
key={q.id}
className='collapse collapse-arrow rounded-md bg-white'
>
<input
  type='checkbox'
  name='my-accordion'
/>
<div
  className={`collapse-title text-xl font-medium ${
    q.userAnswer === true ? 'bg-green-100' : 'bg-red-100'
  }`}
>
  {SimulatorPageContent.items[q.index].title}
</div>
<div className='collapse-content '></div>
</li> */}