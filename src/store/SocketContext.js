import { createContext } from "react";


const SocketContext=createContext({
    socket:null,
    messages:[],
    sendMessages:()=>{},
    reciveMessage:()=>{}
});
export default SocketContext;