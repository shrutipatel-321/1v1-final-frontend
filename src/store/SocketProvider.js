import { useCallback, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import AuthContext from "./AuthContext";
import SocketContext from "./SocketContext";

const intialState={
    socket:null,
    messages:[],
};

export const SocketProvider=({children})=>{
    const[socketState,setSocketState]=useState(intialState);
    const {token,user_id}=useContext(AuthContext);
    //const navigate=useNavigate();
    useEffect(()=>{
        const newSocket = io.connect('http://localhost:7000',{
            query:{
                userId:user_id,
                token:token
            }
        });
        setSocketState((prevState) => ({
            ...prevState,
            socket: newSocket
          }));
      
        

        return () => newSocket.close();
    },[user_id,token]);

const sendMessage = useCallback(({userId,message}) => {
    if (socketState.socket) {
      socketState.socket.emit('message', message);
    }
  }, [socketState.socket]);

const receiveMessage = useCallback((message) => {
    setSocketState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
 }, []);
    const socketContextValue={
        socket:socketState.socket,
        message:socketState.messages,
        sendMessages:sendMessage,
        reciveMessage:receiveMessage,
    };
    return (
        <SocketContext.Provider value={socketContextValue}>
            {children}
        </SocketContext.Provider>
    );
};
export default SocketProvider
