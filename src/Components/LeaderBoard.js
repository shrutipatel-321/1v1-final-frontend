import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../store/AuthContext";
import Loader from "./quizz-game/Loader";

function LeaderBoard() {
    const [users,setUsers]=useState([]);
    const[loading,setLoading]=useState(false);
    const{token}=useContext(AuthContext);

    useEffect(()=>{
        const fetchuser=async()=>{
        try{
       const result=await fetch(`${process.env.REACT_APP_API_URL}/api/game/leaderboard`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
       const res=await result.json();
       setLoading(true);
       if(!res || res.status!=='success')
         throw new Error('Users not found');
        setUsers(res.users);
        setLoading(false);
        }catch(err){
            setLoading(false);
           toast.error('Invalid submission');
        }
    };
    fetchuser();
    return ()=>{
        setLoading(false);
    }
    },[]);
    return (
        loading ?<Loader/>:(
        <div className="divide-y divide-stone-200 px-2 space-y-2">
        {users && Array.isArray(users) && users.length !== 0 ?(
            users.map((user, index) => (
            
           <li className="flex items-center  flex-row justify-between sm:gap-6 py-2 text-sm font-bold " key={index}>
            <p className="text-sm font-bold items-center">{user.username }</p>
            <p className="text-sm font-bold items-center py-3">{user.won}</p>
           </li>
           
            ))
         ) : null}
         </div>
        )
    );
}

export default LeaderBoard
