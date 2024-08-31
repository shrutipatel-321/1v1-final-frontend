import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../store/AuthContext";
//import SocketContext from "../../store/SocketContext";
import Button from "../Utils/Button";
import initializeSocket from "../../store/Socket";
let Socket=initializeSocket('NotifyItem');
function NotifyItem({userId,gameId,nameo,namep}) {
   // const{Socket}=useContext(SocketContext);
    const {token,user_id}=useContext(AuthContext);
    const navigate=useNavigate();
     const handleClick=async ()=>{
       //console.log("YES");
       if(!Socket){
        Socket=initializeSocket('NotifyItem');
       }
       try{
          Socket.emit('access-granted',{user_id:userId,game_id:gameId});
       }catch(err){
           toast.error(err);
       }
       
       //sendMessages({toUserId:touserId,message:"Hello world"});
     };
     //const handleClick

    return (
        <li className="flex items-center  flex-row justify-between sm:gap-6 py-2">
          <p className="mb-1 sm:mb-0">
            {nameo}
          </p>
          <div className="flex flex-row justify-between space-gap-6">
            <p className="text-sm font-bold items-center">{namep}</p>
          </div>
            <Button type="small" onClick={handleClick}>Grant request</Button>
          
        </li>
      );
}

export default NotifyItem
