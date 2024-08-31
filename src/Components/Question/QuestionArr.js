import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/AuthContext";
import QuestionContext from "../../store/QuestionContext";
import Loader from "../quizz-game/Loader";
import QuestionItem from "./QuestionItem";

function QuestionArr() {
    const {questionArr,setQuestionsHandler}=useContext(QuestionContext);
    const {token,user_id}=useContext(AuthContext);
    const [Loading,setLoading]=useState(false);
    

    useEffect(() => {
        const fetchQuestions = async () => {
          try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/question/getquestion`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result=await response.json();
            //console.log(result);
            if (!result.status||result.status!=='sucess') {
            throw new Error(result.message);
            }
            setLoading(false);
            setQuestionsHandler(result.data.questions); // Update context with fetched questions
          } catch (error) {
            //console.error('Error fetching questions:', error);
            setLoading(false);
          }
        };
    
        fetchQuestions();
     }, [ ]);
      //console.log(questionArr);
    return (
        Loading?<Loader/>:(
        <ul className="divide-y divide-stone-200 px-2 space-y-2">
          { questionArr && Array.isArray(questionArr) && questionArr.length>0 && questionArr.map((question,index)=>(
            <QuestionItem questionobj={question} index={index} key={index} />
          ))}
        </ul>
        )
      );
    
}

export default QuestionArr
