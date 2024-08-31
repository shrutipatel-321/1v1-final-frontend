import { createContext } from "react";

const QuestionContext = createContext({
    questionArr: [],
    setQuestionsHandler: () => {},
    unSetQuestionHandler: () => {},
    updateQuestionHandler: () => {},
    addQuestionHandler: () => {},
});
  
export default QuestionContext;