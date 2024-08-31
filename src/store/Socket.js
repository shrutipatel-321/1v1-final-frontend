import { io } from "socket.io-client";

let socket=null;

const initializeSocket = (user_id=null,token=null,final=null) => {
  //  user_id = (user_id ===null)?localStorage.getItem('user_id'):user_id;
  //  token = (token ===null)?localStorage.getItem('token'):token;
   //token = localStorage.getItem('token');
  //const{user_id,token}=useContext(AuthContext);
   const url=process.env.REACT_APP_API_URL.replace(/^"|"$/g, '');
  // console.log(user_id,token);
  if ((!socket || socket===undefined) && user_id && token) {
  //console.log(user_id, token, url,"YES");
  //console.log(user_id, token, url,"YES");
  
    socket = io.connect(`${process.env.REACT_APP_API_URL}`, {
      query: {
        userId: user_id,
        token: token
      }
    });
  }

  return socket;
};

export default initializeSocket;
