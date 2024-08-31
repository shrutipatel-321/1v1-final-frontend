// let Socket=initializeSocket();
import Options from "./Options";
function Question({question,dispatch,answer,wrongans,ind,gid}) {
    //console.log(question);
    //const[question,setQuestion]=useState({});
    // useEffect(()=>{
    //    if(!Socket || Socket===undefined){
    //     Socket=initializeSocket('Question');
    //     console.log(Socket);
    //     if(Socket===undefined){
    //         dispatch({type:"dataFailed"});
    //         return;
    //     }
        
    //     }
    //    Socket.on('get-question',(data)=>{
    //      console.log(data,"NO data");
    //      setQuestion(data);
    //    });
    // },[]);
    //console.log(question,"NOO");
    return (
        <div>
            <h4 className="mb-8  text-2xl  md:text-3xl py-4 font-system-ui">{question.question}</h4>
            <Options question={question}
            dispatch={dispatch}
            answer={answer}
            ind={ind}
            gid={gid}
            />
           
        </div>
    );
}

export default Question
