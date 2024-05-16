import React, { useState, useEffect } from 'react';
import { Stepper, Step } from '@material-tailwind/react';
import ProgressBar from '../ProgressBar';
import { SimulatorPageContent } from '../../store/content/SimulatorPageContent';
import CommonButton from '../buttons/CommonButton';
import StepContainer from './StepContainer';
import { useQuestionsStepper } from '../../store/StoreStepper';
import { useNavigate } from 'react-router-dom';


export function VirtualStepper() {
  const navigate = useNavigate();

  const {
    QChecked,
    QCheckedState,
    isDisabled,
    setDisabledState,
    shouldReload,
    setShouldReload,checkCount,
    setCheckCount,activeStep, setActiveStep,answer, unCorrectAnswer
  } = useQuestionsStepper();
  const totalSteps = SimulatorPageContent.items.length;

  const activeItem = SimulatorPageContent.items[activeStep] || {};


  const handleNext = () => {
    if (activeStep < totalSteps ) {
      setActiveStep(activeStep + 1);
      setCheckCount(0); // Reset checkCount
      QChecked ? (QCheckedState(), setDisabledState()) : QChecked;
    }
    
  };
  
  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setCheckCount(0)
      QChecked ? (QCheckedState(), setDisabledState()) : QChecked;
    }
  };

  const checkAnswers = () => {
    setDisabledState();
    QCheckedState();
    setCheckCount();
    
  };

  
 useEffect(() => {
  if (activeStep >= totalSteps) {
    navigate('/simresult');
  }
  console.log(checkCount);
  // console.log('Stepper Step',activeStep);
  // console.log('Stepper answer',answer);
  
 }, [activeStep, answer]);

 
  return (
    <>
      <div className='w-11/12 m-auto h-[100%] px-12  flex flex-col justify-evenly overflow-auto'>
        <ProgressBar
          activeStep={activeStep}
          totalSteps={totalSteps}
        />
        <Stepper
          className='h-5/6 bg-white'
          activeStep={activeStep}
        >
          <Step
            key={activeItem.id}
            className='w-full flex flex-col h-full bg-white place-items-stretch'
            onClick={() => setActiveStep(activeStep)}
          >
            <StepContainer
              title={activeItem.title}
              content={activeItem.content}
              steps={totalSteps}
              activeStep={activeStep}
            />
          </Step>
        </Stepper>
      </div>
      <div className='w-full h-14 bg-blue-100 flex justify-center gap-4 p-1'>
        <CommonButton
          onClick={handlePrev}
          text='Назад'
        />
        <CommonButton
          onClick={checkAnswers}
          text={checkCount == 3? 'Проверено' : !isDisabled ? 'Проверить ответ': 'Заново'}
          disabled={checkCount == 3?true:false}
        />

        <CommonButton
          onClick={handleNext}
          text={activeStep === totalSteps - 1 ? 'Закончить' : 'Далее'}
        />
      </div>
    </>
  );
}
