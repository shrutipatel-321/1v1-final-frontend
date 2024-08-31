import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../store/AuthContext";
import GameItem from "./GameItem";
//import SocketContext from "../../store/SocketContext";
//const handleClick=async()=>{
import { toast } from "react-toastify";
//   const response=await fetch();
// }
import initializeSocket from "../../store/Socket";
let Socket=initializeSocket('Games');
function Games() {
    const[games,setGames]=useState([]);
    const {token,user_id}=useContext(AuthContext);
    //const {socket}=useContext(SocketContext);
    const [grantedGames,setGrantedGames]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
      
      
      if(!Socket){
        Socket=initializeSocket('Game');
        //console.log(!Socket);
        //return;
      }
      Socket.on('game-created',(data)=>{
          // if(data.owner!==user_id)
          //   setGames((prevGames) => [...prevGames, data.game]);
         // console.log(data)
          
          setGames((prevGame)=>{
            if(Array.isArray(prevGame)){
              //console.log(data.game);
              return [...prevGame,data.game]
            }else{
             return [data.game]
            }
          })
      });
      // socket.on('lobby-joining',(data)=>{
     
      // });
      Socket.on('join_game_lobby',(data)=>{
           //console.log(data);
          if(data.message==='success'){
            setGrantedGames((prevGames) => {
              if (Array.isArray(prevGames)) {
                return [...prevGames, data.gameId];
              } else {
                return [data.gameId];
              }
            });
          }
      });
      // socket.on('remove',(data)=>{
      //   handleRemove(data.gameId);
      // })
      
    },[navigate,user_id]);

    // useEffect(() => {
    //   const gameChannel = pusher.subscribe('public-game-channel');
    //   gameChannel.bind('new-game', (data) => {
    //     console.log(data);
    //     if(data.game.owner!==user_id)
    //     setGames((prevGames) => [...prevGames, data.game]);
    //   });
    //   console.log("Yes");
    //   // Cleanup subscription on unmount
    //   return () => {
    //     gameChannel.unbind_all();
    //     gameChannel.unsubscribe();
    //   };
    // }, [user_id]);
    useEffect(()=>{
      const fetchgame= async()=>{
        try{
        const response= await fetch(`${process.env.REACT_APP_API_URL}/api/game/all-game/${user_id}`, {
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
        //console.log(result);
        setGames(result.game);
      }
      catch(err){
        toast.err('No game Found');
        //console.log(err);
     }
    };
      fetchgame();
    },[]);
    
    const handleRemove=(id)=>{
        //console.log(id);
        const newGamearr=games.filter((ele)=>ele._id!==id);
        setGames(newGamearr);
    }
    //console.log(games);
    return (
        <>
        <h2 className="mt-7 text-xl font-semibold">All available games</h2>

        <ul className="mt-3 divide-y divide-blue-300 border-b">
        {games && Array.isArray(games) && games.length>0 && games.map((ele) => (
          <GameItem game={ele} key={ele._id} grantedGames={grantedGames} />
        ))}
      </ul>
      </>
    )
}

export default Games
