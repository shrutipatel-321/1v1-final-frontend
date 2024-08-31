import React, { useState } from "react";
import QuestionContext from "./QuestionContext";

const intialState={
    questionArr:[],
    
};
const QuestionProvider = ({ children }) => {
    const [questionState, setQuestionState] = useState(intialState);

    const unSetQuestionHandler = (index) => {
        if (index >= questionState.questionArr.length || index < 0) return;
        const OriginalArr = [...questionState.questionArr];
        const newArray = OriginalArr.filter((_, ind) => index !== ind);
        setQuestionState({ questionArr: newArray });
      };
    
      const updateQuestionHandler = (index, newObj) => {
        
        const OriginalArr = [...questionState.questionArr];
        index=(index<0)?OriginalArr.length-1:index;
        const newArray = [
          ...OriginalArr.slice(0, index),
          newObj,
          ...OriginalArr.slice(index + 1),
        ];
        setQuestionState({ questionArr: newArray });
      };
      const addQuestionHandler=(question)=>{
        const OriginalArr = [...questionState.questionArr];
        const newArray=[...OriginalArr,question];
        setQuestionState(newArray);
        //console.log(questionS)
      };
      const setQuestionsHandler = (questions) => {
        //console.log(questions);
        setQuestionState({ questionArr: questions });
      };
    
      const QuestionContextValue = {
        questionArr: questionState.questionArr,
        setQuestionsHandler,
        unSetQuestionHandler,
        updateQuestionHandler,
        addQuestionHandler
      };
 return (
        <QuestionContext.Provider value={QuestionContextValue}>
            {children}
        </QuestionContext.Provider>
    );
}
export default QuestionProvider