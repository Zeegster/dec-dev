import { useEffect } from 'react';
import { useQuestions, useScore, useTimer } from '../store/Store';
import HeaderInner from '../components/HeaderInner';
import HomePageButton from '../components/buttons/HomePageButton';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommonButton from '../components/buttons/CommonButton';
import React from "react";
function ResultPage() {
  const score = useScore((state) => state.score);
  const questions = useQuestions((state) => state.QStore);

  const { timer } = useTimer();


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
  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/');

  };
  const { finishedTask } = useTimer();
  const clearScore = useScore((state) => state.clearScore);
  const correctAnswersLength = useQuestions(
    (state) => state.correctAnswers
  ).length;

  const correctAnswers = useQuestions((state) => state.correctAnswers);
  const unCorrectAnswer = useQuestions((state) => state.unCorrectAnswer);

  const handleClick = () => {
    clearScore();
    finishedTask();
    routeChange();
    location.reload();

  };

  return (
    <div className='flex flex-col justify-between h-full min-h-screen text-white'>
      <HeaderInner title='Результаты теста !' />
      <div className='p-4 w-2/3 mx-auto text-black flex-grow'>

        <div className='bg-white shadow stats flex flex-row rounded-lg divide-x divide-gray-200'>
          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Потраченное время</div>
            <div className='text-xl font-bold'>{timeSpent} сек</div>
          </div>

          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Заработано баллов</div>
            <div className='text-xl font-bold'>{score}</div>
          </div>

          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Правильных ответов</div>
            <div className='text-xl font-bold'>{correctAnswersLength}</div>
          </div>

          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Процент правильных</div>
            <div className='text-xl font-bold'>
              {Math.round(
                (correctAnswersLength /
                  (correctAnswersLength + unCorrectAnswer.length)) *
                  100
              )}
              %
            </div>
          </div>
        </div>

        <ul className='divide-y divide-gray-200 h-full'>
          {correctAnswers.map((q) => (
            <li
              key={q.id}
              className='bg-green-100 p-4'
            >
              <strong className='font-medium'>{q.id+1}. {q.question}</strong>
            </li>
          ))}

          {unCorrectAnswer.map((q) => (
            <li
              key={q.id}
              className={'bg-red-100 p-4'}
            >
              <strong className='font-medium'>{q.id+1}. {q.question}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className='w-full h-14 bg-blue-100 flex py-1 pl-12'>
        <CommonButton
          onClick={handleClick}
          text={'Закончить'}
        />
      </div>

      <HomePageButton />
    </div>
  );
}

QuizResults.propTypes = {
  timeSpent: PropTypes.number,
  score: PropTypes.number,
  questions: PropTypes.array,
};

export default ResultPage;

    function undefined({timeSpent, score, correctAnswersLength}) {
      return (<div className='bg-white shadow stats flex flex-row rounded-lg divide-x divide-gray-200'>
          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Потраченное время</div>
            <div className='text-xl font-bold'>{timeSpent} сек</div>
          </div>

          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Заработано баллов</div>
            <div className='text-xl font-bold'>{score}</div>
          </div>

          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Правильных ответов</div>
            <div className='text-xl font-bold'>{correctAnswersLength}</div>
          </div>

          <div className='flex flex-col p-4'>
            <div className='text-lg font-medium mb-2'>Процент правильных</div>
            <div className='text-xl font-bold'>
              {Math.round(correctAnswersLength / (correctAnswersLength + unCorrectAnswer.length) * 100)}
              %
            </div>
          </div>
        </div>);
    }
  