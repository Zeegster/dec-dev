import HomePage from "./pages/HomePage";
import React from "react";
import InfographicPage from "./pages/InfographicPage.jsx";
import SimulatorPage from "./pages/SimulatorPage.jsx";
import QuestionPage from "./pages/QuestionPage";
import { HashRouter, Route, Routes } from "react-router-dom";
import Question from "./components/question/Question";
import ResultPage from "./pages/ResultPage";
import SimulatorResultPage from "./pages/SimulatorResultPage";

function App  ()  {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/infographic" element={<InfographicPage />} />
        <Route path="/simulator" element={<SimulatorPage />} /> 
        <Route path="/question" element={<QuestionPage />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/simresult" element={<SimulatorResultPage />} />

      </Routes>
    </HashRouter>
  );
}

export default App;