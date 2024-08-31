import React, { useState } from "react";
import AuthContext from "./AuthContext";
import initializeSocket from "./Socket";

const initialState = {
  name: localStorage.getItem('name') || '',
  user_id: localStorage.getItem('user_id') || '',
  token: localStorage.getItem('token') || '',
  // Socket:initializeSocket(),
};

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);

  const unsetCredHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    setAuthState({
      name: '',
      user_id: '',
      token: '',
    });
  };

  const setCredHandler = (username, id, newtoken) => {
    localStorage.setItem('token', newtoken);
    localStorage.setItem('user_id', id);
    localStorage.setItem('name', username);
    setAuthState({
      name: username,
      user_id: id,
      token: newtoken,
    });

  };
  // const setSocket=()=>{
  //   const newSocket=initializeSocket(authState.user_id,authState.token);
  //   setAuthState({
  //     ...authState,
  //     Socket:newSocket,
  //   });
  //   console.log("YES");
  // };
  const authContextValue = {
    name: authState.name,
    user_id: authState.user_id,
    token: authState.token,
    Socket:authState.Socket,
    unsetCredHandler,
    setCredHandler,
    //setSocket,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
