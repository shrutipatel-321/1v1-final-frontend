import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
//import SocketContext from "../../store/SocketContext";
import NotifyItem from "./NotifyItem";
import initializeSocket from "../../store/Socket";
let Socket=initializeSocket('Notification');
function Notification() {
        //const {Socket}=useContext(SocketContext);
        const {token,user_id}=useContext(AuthContext);
        const navigate=useNavigate();
        const[message,setMessage]=useState([]);
        useEffect(() => {
          if (!Socket){ 
            Socket=initializeSocket('Notification');
            //console.log(Socket===null);
            //return;
          }
      
          const handleResJoin = (data) => {
            //console.log(data);
            if(data.message==='success'){
              
            setMessage((prevMessages) => {
              if (Array.isArray(prevMessages)) {
                return [...prevMessages, data];
              } else {
                return [data];
              }
            });
          }
        };
      
        // const handleJoining = (data) => {
        //     console.log(data, "joining message");
        //     if (data.message === 'success') {
        //       navigate(`/game-start/${data.gameId}/${data.}`);
        //     }
        //   };

          Socket.on('res-join', handleResJoin);
          //Socket.on('joining', handleJoining);
      
          // Cleanup function to remove event listeners when the component unmounts
          return () => {
            Socket.off('res-join', handleResJoin);
            //Socket.off('joining', handleJoining);
          };
        }, [navigate]);
     
        useEffect(()=>{
          let userId = user_id.replace(/^"|"$/g, '');
        const fetchNotification=async()=>{
              try{
               const response=await fetch(`${process.env.REACT_APP_API_URL}/api/chat/getnotifications/${userId}`,{
                method: 'GET',
               headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
             });
        const result=await response.json();
        //console.log(result);
        setMessage(result.matchingChats)
        if (!result.status||result.status!=='sucess') 
        throw new Error(result.message);
        setMessage(result.matchingChats)
        }catch(err){
            //console.log(err);
        }
           
       }
            fetchNotification();
        },[])
        
        //console.log(message);
        return (
          <div className="notifications">
            <h2>Notifications</h2>
            {Array.isArray(message) && message.length !== 0 ?(
           message.map((msg, index) => (
          <NotifyItem key={index} userId={msg.particpantId} gameId={msg.gameId} nameo={msg.nameg} namep={msg.namep}/>
           ))
        ) : null}
          </div>
        );
}

export default Notification
