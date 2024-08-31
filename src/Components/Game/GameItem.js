import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Utils/Button";
//import SocketContext from "../../store/SocketContext";
import AuthContext from "../../store/AuthContext";
import initializeSocket from "../../store/Socket";

let Socket=initializeSocket('GameItem');
function GameItem({game,grantedGames}) {
    //const{socket}=useContext(SocketContext);
    const hasGranted=grantedGames.includes(game._id);
    const {user_id}=useContext(AuthContext);
    const navigate=useNavigate();
    //const{usrt}
     const handleClick=()=>{
       const touserId=game.owner;
       
       if(!Socket){
        Socket=initializeSocket('GameItem');
        //console.log(Socket===null);
        //return;
       }
       
       Socket.emit('req-join', {toUserId:touserId,gameId:game._id,message:"Hello world"});
       //sendMessages({toUserId:touserId,ganeId:game._id,message:"Hello world"});
    };
     const handleJoin=()=>{
      //console.log("YES");
      if(!Socket){
        Socket=initializeSocket('GameItem');
        //console.log(Socket===null);
        //return;
       }
      Socket.emit('join_lobby',{user_id:user_id,game_id:game._id});
      navigate(`/lobby/${game._id}`);
    };
     //console.log(game.owner);
     
    return (
        <li className="flex items-center  flex-row justify-between sm:gap-6 py-2">
         <p className="text-sm font-bold ">{game.name}</p>
          <div className="flex flex-row justify-between space-gap-6">
          
          <p className="text-sm font-bold items-center">{game.ownerName}</p>
          </div>
            <Button type="small" onClick={handleClick}>Join the game</Button>
            {(hasGranted || (user_id===game.owner)) && <Button type="small" onClick={handleJoin}>Join the Lobby</Button>}
        </li>
      );
}

export default GameItem
