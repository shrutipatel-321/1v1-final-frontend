import { createContext } from "react";

const QuizzContext = createContext({
  question: "",
  status: "",
  index: 0,
  answer: null,
  points: 0,
  checkAns: () => {},
  nextQuestion: () => {},
  loadQuestion: () => {},
});
export default QuizzContext;
