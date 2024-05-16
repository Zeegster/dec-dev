import MenuItem from "./MenuItem";
import { useQuestions } from "../../store/Store";
import React from "react";

const MenuList = () => {
  const questions = useQuestions((state) => state.QStore);

  return (
    <>
      <ul className="flex flex-wrap max-w-4xl px-12 overflow-auto">
        {questions.map((question) => (
          <li className="w-1/4" key={question.id}>
            <MenuItem question={question} id={question.id} />
          </li>
        ))}
      </ul>

    </>
  );
};

export default MenuList;
