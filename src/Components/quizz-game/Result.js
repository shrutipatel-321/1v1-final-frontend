import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../store/AuthContext";
import Loader from "./Loader";
function Result() {
    const[games,setGame]=useState([]);
    const{user_id,token}=useContext(AuthContext);
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
     const fetchGames=async()=>{
        try{
          setLoading(true);
            const result=await fetch(`${process.env.REACT_APP_API_URL}/api/game/getPlayed/${user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
          const res=await result.json();
          if(!res||res.status!=='sucess')
            throw new Error("No game found Error");
          //console.log(res.games);
          setGame(res.games);
          setLoading(false);
          toast.success('Result updating...')
        }catch(err){
          toast.error('No game found');
         //console.log("Error",err);
        }
     }
     fetchGames();
    },[ ]);
    //console.log(games,games[0].status,games[9].participants);
    return (
      loading?<Loader/>:(
        <div className="divide-y divide-stone-200 px-2 space-y-2">
        {games.map((game,index) => (
        <React.Fragment key={index}>
          <div>
          <div
      className={`font-semibold ${game && game.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}`}
    >
      {game.status}
    </div>
    <div className="font-semibold text-blue-500">Game name-{game.name}</div>
          <div style={{ color: '#CC00CC' }} className="font-semibold">owner-{game.owner}</div>
          <div>
          participants-
          {game && Array.isArray(game.participants) && game.participants.map((p, i) => (
          <span key={i}>{p}</span>
        ))}
          </div>
          {game.status === 'completed' ? <div className="text-red-500 font-semibold">winner-{game.winner}</div> : null}
          </div>
        </React.Fragment>
      ))}
        </div>
    ))
}

export default Result
