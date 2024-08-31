import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../store/AuthContext";
import Button from "../Utils/Button";
import classes from "./index.module.css";
function FinishScreen({points,maxPoints,gameId}) {
    const percentage=(points /25)*100;
    const navigate=useNavigate();
    const{token,user_id}=useContext(AuthContext);
    //let emoji="e"
    useEffect(()=>{
        
        const submitPoint=async ()=>{
        try{
             const result=await fetch(`${process.env.REACT_APP_API_URL}/api/game/finishgame/${user_id}`,{
               method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({gameId:gameId,newScore:points}),
            });
            const res=await result.json();
            if(!res||res.status!=='sucess')
                throw new Error('Submission of data is incomplete');
            toast.success('Result submitted');
        }catch(err){
           console.log("Error");
           toast.error('Result cannot be submitted');
        }
        }
        submitPoint();
    },[]);
    return (
        <>
        <p className={classes.result}>
            You scored <strong>{points}</strong>out of
            {25}(
                {Math.ceil(percentage)}
            )
        </p>
        {/* //<p className="highscore">(Highest:{highestScore})</p> */}
        <div className="flex flex-row justify-center items-center h-screen mx-4 "> 
        <Button
         type="primary"
        onClick={()=>navigate('/result')}
        >
        Result
        </Button>
     </div>
        </>
    )
}

export default FinishScreen
