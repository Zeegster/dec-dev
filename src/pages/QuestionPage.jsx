import HeaderInner from '../components/HeaderInner';
import React from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuList from '../components/question/MenuList';
import Timer from '../components/Timer';
import { useQuestions, useScore, useTimer } from '../store/Store';
import HomePageButton from '../components/buttons/HomePageButton';

const QuestionPage = () => {
  const navigate = useNavigate();
  const questions = useQuestions((state) => state.QStore);
  const startTimer = useTimer((state) => state.startTimer);
  const interval = useTimer((state) => state.interval);
  const currentScore = useScore((state) => state.score);
  const attempt = useScore((state) => state.attempt);
  const score = useScore((state) => state.score);
  const clearScore = useScore((state) => state.clearScore);
  const finishedTask = useTimer((state) => state.finishedTask);

  const handleClick = () => {
    clearScore();
    finishedTask();
    navigate('/');
    location.reload();
  };
  console.log(currentScore);
  console.log(questions.length);

  useEffect(() => {
    setTimeout(() => {
      startTimer();
    }, 100);

    if (currentScore >= 1550) {
      navigate('/result');
      clearInterval(
        JSON.parse(localStorage.getItem('timer-storage')).state.interval
      );
    }

    if (attempt === 0) {
      navigate('/result');
      clearInterval(
        JSON.parse(localStorage.getItem('timer-storage')).state.interval
      );
    }
  }, [currentScore, attempt]);


  return (
    <div className='h-screen relative flex flex-col items-center justify-between min-h-full'>
      <HeaderInner
        title='Диагностика'
        subtitle='Перед вами задания разных уровней сложности. У вас 10 попыток, чтобы получить призовые 1550 
        очков. Кликните на карточку, чтобы перейти к заданию. Выберите вариант (варианты) ответа и нажмите
        кнопку “Ответить”.'
      />

      <MenuList />

      <div className='w-full h-14 bg-blue-100 flex items-center py-4 pl-32'>
        <Timer />
        <div className="text-white font-semibold flex w-full justify-end mr-32">
          <span className="mr-12">Количество очков: {score}</span>
          <span>Количество попыток: {attempt}</span>
        </div>
      </div>

      <HomePageButton onClick={()=>handleClick()}/>
    </div>
  );
};

export default QuestionPage;
