import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderInner from '../HeaderInner';
import { useQuestions, useScore } from '../../store/Store';
import CommonButton from '../buttons/CommonButton';
import { useQuestionsStepper } from '../../store/StoreStepper';
import { SelectInput} from '../inputs/Select';
import { MyDragList } from '../inputs/MyDragList';
import { TextInput } from '../inputs/Text';
import { QCheckBox } from '../inputs/CheckBox';
import React from "react";

const Question = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { QStore, answerQuestion, unCorrect, correctAnswers, unCorrectAnswer } =
    useQuestions();
  const { QChecked, isDisabled, setDisabledState, QCheckedState, answer } =
    useQuestionsStepper();
  const questions = QStore[id];
  const { getScore } = useScore();

  const [userAnswer, setUserAnswer] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  // const question = questions.find((q) => q.id == id);

  const correctAnswerClass = 'bg-green-100 text-white';
  const wrongAnswerClass = 'bg-red-100 text-white';

  const getAnswerClass = (option) => {
    if (option.isCorrect) {
      return correctAnswerClass;
    } else {
      return wrongAnswerClass;
    }
  };

  if (!questions) {
    return <div></div>;
  }

  const handleSubmit = () => {
    setShowAnswers(true);
  };

  function handleAnswer(answer, question) {
    
    if (answer.isCorrect ) {
      answerQuestion(question);
      getScore(question.value);
      useScore.setState((state) => ({
        attempt: state.attempt - 1,
      }));
      console.log('CORRECT ANSWER');
    }

    if (!answer.isCorrect) {
      unCorrect(questions);
      useScore.setState((state) => ({
        attempt: state.attempt - 1,
      }));
      console.log('UNCORRECT ANSWER');
    }

    handleSubmit();
  }
  
  function handleComponent (){
    setDisabledState(),
    QCheckedState(),
    setSelectedAnswer(questions.id)

  }
  function handleClick () {
    setSelectedAnswer(null)
    QChecked&&QCheckedState()
    isDisabled&&setDisabledState()
    navigate('/question')

  }

  return (
    <>
      <div className='flex flex-col justify-between items-center h-screen'>
        <HeaderInner
          title={questions.questionTitle || 'Выберите правильный вариант ответа'}
          subtitle={questions.question}
        />
        {questions.content}
        {/* Условный рендер */}
        <div className='flex flex-col w-2/3 justify-center h-[50vh] cursor-pointer'>
          {showAnswers && !questions.type ? (
            // Показать все варианты с подсветкой
            questions.options.map((option) => (
              <div
                key={option.id}
                className={`${getAnswerClass(
                  option
                )} mb-2 mt-2 p-4 rounded-lg `}
              >
                {option.text}
              </div>
            ))
          ) : questions.type == 'select' ? (
            <SelectInput
              QuestionStore={id}
              Store={useQuestions}
            />
          ) : questions.type == 'input' ? (
            <TextInput
              QuestionStore={id}
              Store={useQuestions}
              classNames='text-xl'
              placeholder='Ваш ответ'
            />
          ) : questions.type == 'checkbox' ? (
            <QCheckBox
              index={id}
              Store={useQuestions}
            />
          ) : questions.type == 'draglist' ? (
            <MyDragList
              QuestionStore={id}
              Store={useQuestions}
              wrapperClassNames='justify-center m-auto'
              listTwoClassNames='w-full'
            />
          ) : (
            // Обычный рендер без подсветки
            questions.options.map((option) => (
              <div
                className='text-black bg-blue-50 mb-2 mt-2 p-4 rounded-lg hover:bg-blue-700 '
                onClick={() => {
                  setSelectedAnswer(option.id);
                  handleAnswer(option, questions);
                }}
                key={option.id}
              >
                {option.text}
              </div>
            ))
          )}
        </div>

        <div className='w-full h-14 bg-blue-100 flex justify-center py-1'>
          {/* Кнопка Ответить */}
          {!isDisabled && questions.type && (
            <CommonButton
              onClick={() => handleComponent()}
              text={'Проверить'}
            />
          )}
          {selectedAnswer!==null && (
            <CommonButton
              onClick={() => handleClick()}
              text={'Ответить'}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
