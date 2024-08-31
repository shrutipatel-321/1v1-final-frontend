import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import pusher from "../../PusherConfig";
import AuthContext from "../../store/AuthContext";
import QuestionContext from "../../store/QuestionContext";
import Button from "../Utils/Button";
function QuestionItem({questionobj,index}) {
    const{updateQuestionHandler,unSetQuestionHandler,addQuestionHandler}=useContext(QuestionContext);
    const{token,user_id}=useContext(AuthContext);
    const navigate=useNavigate();
    const[isopen,setIsOpen]=useState(false);
    //console.log(questionobj);
    useEffect(()=>{
      if(user_id){
       const channel = pusher.subscribe(`public-delete-question`);
 
       channel.bind('pusher:subscription_succeeded', () => {
         //console.log(`public-delete-question`);
       });
 
       channel.bind('question-deleted', function (data) {
        //console.log(data);
         unSetQuestionHandler(data.index);
       });
 
       return () => {
         channel.unbind_all();
         channel.unsubscribe();
       };
      }
   },[user_id,unSetQuestionHandler]);
   useEffect(()=>{
    if(user_id){
     const channel = pusher.subscribe(`public-add-question`);
     channel.bind('add-question',function(data){
      //console.log(data);
      updateQuestionHandler(-2,data);
     });

     return () => {
       channel.unbind_all();
       channel.unsubscribe();
     };
    }
 },[user_id,updateQuestionHandler]);
   const makeRequest= async ()=>{
    const confirmation = window.confirm('Are you sure you want to delete this item?');
    if(confirmation){
      await handleDelete();
    }
   }
    const handleDelete=async( )=>{
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/question/deletequestion/${questionobj._id}/${index}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
    
                // Add any other headers as needed
              },
            });
            const data=await response.json();
            if (!data.status ||data.status!=='sucess') {
              throw new Error('Failed to delete question');
            }
            toast.success('Question deleted sucessfully');
            //console.log(data);
             // Update context to remove question locally
          } catch (error) {
            toast.error(error);
            //console.error('Error deleting question:', error);
            // Handle error as needed (e.g., show a notification)
          }
    };

    return (
        !isopen?(
        <div onClick={()=>setIsOpen(true)}>
            <div className="font-sans">{questionobj.question}</div>
        </div>
        ):(
          
          <div onClick={()=>setIsOpen(false)}>
             <div>{questionobj.question}</div>
             <div className="flex space-x-4">
             <p>a</p><p ml-2px>{questionobj.optionA}</p>
             </div>
             <div className="flex space-x-4">
             <p>b</p><p ml-2px>{questionobj.optionB}</p>
             </div>
             <div className="flex space-x-4">
             <p>c</p><p ml-2px>{questionobj.optionC}</p>
             </div>
             <div className="flex space-x-4">
             <p>d</p><p ml-2px>{questionobj.optionD}</p>
             </div>
             <div className="flex space-x-4">
             <p className="text-green-500 font-semibold">{questionobj.correctOption}</p>
             </div>
             <div className="flex flex-row justify-between">
             <Button type="small" onClick={()=>makeRequest()}>Delete</Button>
             <Button type="small" onClick={()=>navigate(`/update/${questionobj._id}`)}>Update</Button>
             </div>
          </div>
        )
      )
    
}

export default QuestionItem
