import { createContext } from "react";

const AuthContext = createContext({
  name: "",
  token: "",
  user_id: "",
  Socket:null,
  unsetCredHandler: () => {},
  setCredHandler: () => {},
  // cls
});

export default AuthContext;
