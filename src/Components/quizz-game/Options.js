import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../store/AuthContext";
// import SocketContext from "../../store/SocketContext";
import initializeSocket from "../../store/Socket";
let Socket=initializeSocket('option');
function Options({question,dispatch,answer,ind,gid}) {
  ///const {Socket}=useContext(SocketContext);
    //const hasAnswered=answer;
    //const{id,gid}=useParams();
    const{user_id,token}=useContext(AuthContext);
    const[iscorrect,setIsCorrect]=useState(false);
    //const[ans,setans]=useState(-1);
    //console.log(gid,id);
    // useEffect(()=>{
    //     if(user_id){
    //      const channel = pusher.subscribe(`private-user-${user_id}`);
   
    //      channel.bind('pusher:subscription_succeeded', () => {
    //        console.log(`Subscribed to private-user-${user_id}`);
    //      });
   
    //      channel.bind('check-ans', function (data) {
    //        //console.log(data);
    //        setIsCorrect(data.score===5);
    //        dispatch({type:"checkAns",payload:data.score});
    //        //dispatch({type:'moveNextQuestion'});
    //      });
   
    //      return () => {
    //        channel.unbind_all();
    //        channel.unsubscribe();
    //      };
    //     }
    //  },[user_id,dispatch]);
    useEffect(()=>{
        if(!Socket || Socket===undefined){
            Socket=initializeSocket('option');
           //console.log(Socket);
           //return;
        }
        //console.log(Socket);
        const handleAns=(data)=>{
            //console.log(data);
            const flag=(data.score===5);
            setIsCorrect(flag);
            dispatch({type:"checkAns",payload:data.score});
        }
        Socket.on('check-ans',handleAns);
        return ()=>{
            Socket.off('check-ans',handleAns);
        }
    },[dispatch]);
    const generateLetter = (num) => {
        return String.fromCharCode(num+1 + 64);
    };
    const handleClick=async (index)=>{
        const obj={
            userId:user_id,
            correct:"option"+generateLetter(index),
        };
        dispatch({type:"setAnswer",payload:index});
        try{
        let response=await fetch(`${process.env.REACT_APP_API_URL}/api/game/check-ans/${ind}/${gid}/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(obj),
            
        });
        response=await response.json();
        if(!response||response.status!=='success')
            throw new Error(response.message);
        toast.success("Ans submitted succesfully");
      }catch(error){
        toast.error("Ans not submittted");
         // console.log(error);
      }
    }
    //console.log(question,answer,hasAnswered);
    return (
        <div className="mx-auto w-1/2  p-8 rounded mt-12">
                {question && Array.isArray(question.option) && question.option.length >0 && question.option.map((option,index)=>(
                   <button 
                   className={`mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:basis-40 w-full rounded-full border
    border-stone-400 px-4 py-4 text-sm transition-all
    duration-300 placeholder:text-stone-400 focus:outline-none focus:ring
    focus:ring-yellow-400 md:px-6 md:py-3 ${answer===index
                            ?iscorrect
                            ?'bg-green-500'
                            :'bg-red-500'
                            : 'bg-gray-200'
                            }`}
                   key={option}
                   disabled={answer}
                   onClick={()=>handleClick(index)}>
                    {option}
                   </button>
                ))}
        </div>
    );
}

export default Options
