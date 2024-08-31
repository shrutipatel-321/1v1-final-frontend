
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
//import SocketContext from "../../store/SocketContext";
import { toast } from "react-toastify";


import Loader from "../quizz-game/Loader";
import Button from "../Utils/Button";
import Timer from "./Timer";
import initializeSocket from "../../store/Socket";
let Socket=initializeSocket('Lobby');
function Lobby() {
    const {game_id}=useParams();
    const {token,user_id}=useContext(AuthContext);
    const[game,setGame]=useState({});
    //const {socket}=useContext(SocketContext);
    const navigate=useNavigate();
    const [participanst,setParticipants]=useState([]);
    const[loading,setLoading]=useState(false);
    const [gameState,setGameState]=useState({
       participant_id:null,
       gameId:null,
       username:null
    });
    //console.log(game_id);
    useEffect(()=>{
      if (!Socket) {
        Socket=initializeSocket('Lobby');
        //console.log(Socket===null);
      }
        const handleJoining = (data) => {
          //console.log(data);
          setParticipants((prevname)=>{
            if(Array.isArray(prevname)){
                return [...prevname,data.name];
            }else{
                return [data.name];
            }
          });
        };
        const startGame=(data)=>{
         // console.log(data);
           setGameState({
              participant_id:data.userId,
              game_id:data.id,
              username:data.username
           })
        }
        Socket.on('lobby-joining', handleJoining);
        Socket.on('start-game',startGame);
      //}
      return () => {
        Socket.off('lobby-joining', handleJoining);
        Socket.off('start-game',startGame);
      };
    },[navigate,Socket]);
    useEffect(()=>{
       const fetchgame=async()=>{
        try{
          setLoading(true);
           let response=await fetch(`${process.env.REACT_APP_API_URL}/api/game/getGame/${game_id}`,{
            method: 'GET',
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
           });
           response=await response.json();
           //console.log(response);
           if(!response ||response.status!=='success')
            throw new Error('Game not found');
           setGame(response.game);
           //console.log(response.game.participants,response.game);
           setParticipants(response.game.participants);
           setLoading(false);
       }catch(err){
        //console.log(err);
        setLoading(false);
       }
       }
       fetchgame();
    },[]);
    const handleClick=async()=>{
      try{
         const response=await fetch(`${process.env.REACT_APP_API_URL}/api/game/formGroup/${game_id}`,{
               method: 'GET',
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
         });
         const res=await response.json();
         if(!res ||res.status!=="success")
          throw new Error("Groups cannot be formed");
        //console.log(res);
      }catch(err){
          toast.error(err);
      }
    }
    //console.log(game,game.name,game.owner);
    if(loading || !game){
      return <Loader/>
    }
    return (
      <>
      { gameState && gameState.participant_id !== null ? (
        <Timer gameState={gameState} />
      ) : (
        <div >
          <p>Owner of this game - {game && game.owner && game.owner.length > 0 && game.owner[0].username}</p>
          {participanst && Array.isArray(participanst) && participanst.length > 0 ? (
            participanst.map((p,index) => (
              <p key={index}>{p}</p>
            ))
          ) : (
            <p>No participants found</p>
          )}
          <p>Game name - { game.name}</p>
          {game && game.owner && game.owner.length > 0 && game.owner[0].id === user_id && (
            <Button type="small" onClick={() => handleClick()}>Form group</Button>
          )}
        </div>
      )}
      </>
    )
}

export default Lobby
