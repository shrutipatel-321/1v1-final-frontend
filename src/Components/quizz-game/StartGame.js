//import DateCounter from "./DateCounter"
import { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import Error from "./Error";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";

const intialState={
  questions:'',
  status:"ready",
  index:0,
  answer:null,
  points:0,
  wrongans:0,
  //loading,error,ready,active,finished
};
const SECS_PER_QUESTIONS=300;
function reducer(state,action){
  switch(action.type){
     case "dataRecived":
      //console.log(action.payload);
      return{
         ...state,
         questions:action.payload,
         status:"ready",
      };
      case "dataFailed":
        return {
          ...state,
          status:"error"
      };
      case "start":
        //console.log("Yes");
        return{
          ...state,
          status:"active",
          
        };
      case "checkAns":
        return{
         ...state,
         wrongans:(action.payload===0)?state.wrongans+1:state.wrongans,
         points:state.points+action.payload,
         ans:null,
        };
      case "setAnswer":
        
        return{
         ...state,
         answer:action.payload,
        };
      case "finish":
        return {...state,status:"finished",highestScore:
      state.points>state.highestScore
      ?state.points:state.highestScore
       };
     case "restart":
      return {
        ...intialState,
        status:"ready",
        questions:state.questions,
        highestScore:state.highestScore,
        answer:null,
      };
      case 'moveNextQuestion':
        //console.log(state.index);
        return {
        ...state,
        index:state.index+1,
        //questions:action.payload.question,
        answer:null,
      };
      case 'nextQuestion':
        return{
          ...state,
          questions:action.payload,
          answer:null
        };
      default:
        throw new Error("Unknown Action");
  }
}
function StartGame() {
  const[{questions,status,index,answer,points,wrongans},dispatch] =useReducer(reducer,intialState);
  const num=5;
  const maxPoints=5;
  const{id,gid}=useParams();
  const {user_id}=useContext(AuthContext);
  //console.log(gid);
  const{token}=useContext(AuthContext);
  
  //const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2JjODAwZjMwOTk5YWYxOWFiMTVmYSIsImlhdCI6MTcxOTM5NzE1MCwiZXhwIjo5NDk1Mzk3MTUwfQ.hxptqw-AE5Hf9tztNo3zBKo0XPrvGUl_GN0mWLggtS8";
  // useEffect(()=>{
  //   const checkAns=async ()=>{
  //     try{
  //       const response = await fetch(`http://127.0.0.1:7000/api/game/check-ans/${index}/667db135f2e16194f9075e35`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${token}`
  //         },
  //         body:JSON.stringify({
  //             correct:answer,
  //         }),
  //     });
  //     const result=await response.json();
  //    // console.log(result);
  //     if (!result.status||result.status!=='sucess') {
  //       throw new Error(result.message);
  //     }
  //     console.log(result.points);
  //     if(result.points){

  //     }else{
  //     dispatch({
  //       type:"checkAns",
  //       payload:{
  //        score:result.points,
  //       }
  //     })
  //     }

  //   }catch(err){
  //     console.log(err);
  //   }
  // };
  // checkAns()
  // },[answer]);
  // useEffect(() => {
  //   if (user_id) {
  //     const channel = pusher.subscribe(`private-question-${id}`);
  
  //     channel.bind('pusher:subscription_succeeded', () => {
  //       console.log(`Subscribed to private-question-${id}`);
  //     });
  
  //     channel.bind('get-question', function (data) {
  //       console.log('Received get-question event:', data);
  //       if (index === 0)
  //         dispatch({ type: "dataRecived", payload: data.question });
  //       else
  //         dispatch({ type: "nextQuestion", payload: data.question });
  //     });
  
  //     return () => {
  //       console.log(`Unsubscribing from private-question-${id}`);
  //       channel.unbind_all();
  //       channel.unsubscribe();
  //       pusher.disconnect();
  //     };
  //   }
  // }, [user_id, id,index]);
  // useEffect(()=>{
  //   socke
  // },[])
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/game/get-next/${index}/${id}/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result=await response.json();
        
        if (!result.status||result.status!=='sucess') {
        throw new Error(result.message);
        }
        //console.log(result.question);
        if (index === 0)
          dispatch({ type: "dataRecived",payload:result.question});
        else
         dispatch({type :"nextQuestion",payload:result.question});
      } catch (error) {
        dispatch({tyoe: "dataFailed"});
        
      }
    };

    fetchQuestions();
 }, [index]);
 //console.log(questions);
  return (
    <div className="app">
      <Header gid={gid}/>
      <Main>
       {status ==="loading"&&<Loader/>}
       {status ==="error"&&<Error/>}
       {status==="ready"&&
       <StartScreen
        num={num} 
        dispatch={dispatch}
       />}
       {status==="active"&&(
       <>
            <Progress
            index={index}
            num={num}
            points={points}
            maxPoints={maxPoints}
            answer={answer}
            />
            <Question
              question={questions}
              dispatch={dispatch}
              answer={answer}
              ind={index}
              gid={id}
            />
            <Footer>
                <Timer dispatch={dispatch}/>
                <NextButton 
                answer={answer}
                dispatch={dispatch}
                num={num}
                wrongans={wrongans}
                index={index}
                gid={id}
                />
            </Footer>
      
       </>
      )}
      
      {
        status==="finished" && (
          <FinishScreen points={points} 
          maxPoints={maxPoints}
          gameId={id}
          dispatch={dispatch}
          />
        )
      }
      </Main>

    </div>
  );
}

export default StartGame
