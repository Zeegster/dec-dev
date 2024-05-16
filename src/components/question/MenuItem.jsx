import { useNavigate } from "react-router-dom";
import { useQuestions } from "../../store/Store";
import PropTypes from 'prop-types';
import React from "react";

const MenuItem = ({ question, id }) => {
  const navigate = useNavigate();

  const correctAnswers = useQuestions((state) => state.correctAnswers);
  const unCorrectAnswer = useQuestions((state) => state.unCorrectAnswer);
 

  const filteredAnswer = [...correctAnswers, ...unCorrectAnswer].map((el) => el.id)

  
  
  const handleClick = () => {
    redirectToQuestion(id);
  };

  const redirectToQuestion = (id) => {
    navigate(`/question/${id}`);
  };

  function getColor(value) {
    switch (value) {
      case 100: {
        return "bg-violent-100";
      }
      case 150: {
        return "bg-white-blue-100";
      }
      case 200: {
        return "bg-gray-200";
      }
      case 250: {
        return "bg-red-200";
      }
    }
  }

  const colorClass = getColor(question.value)
  return (
    <div
      className={`${unCorrectAnswer.some((u)=> u.id===id) ? ` bg-red-400 cursor-not-allowed text-white` : correctAnswers.some((u)=> u.id===id) ? 'bg-green-400 text-white cursor-not-allowed' : `${colorClass} cursor-pointer text-blue-100 max-w-[254px] transition-all duration-100 hover:scale-110`}  p-12 mx-4 my-2 rounded shadow text-center`}
      onClick={unCorrectAnswer.some((u)=> u.id===id) ? null : correctAnswers.some((u)=> u.id===id) ? null: handleClick}
    >
      <p className="font-bold">{question.value}</p>
    </div>
  );
};
MenuItem.propTypes={
  question:PropTypes.object,
  id:PropTypes.number,

}
export default MenuItem;
