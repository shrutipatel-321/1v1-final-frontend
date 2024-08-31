import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Games from "./Components/Game/Games";
import Lobby from "./Components/Game/Lobby";
import Home from "./Components/Home";
import Notification from "./Components/Notification/Notification";
import Question from "./Components/Question/Question";
import QuestionArr from "./Components/Question/QuestionArr";
import Update from "./Components/Question/Update";
import AppLayout from "./Components/Utils/AppLayout";
import Login from "./Components/authComponent/Login";
import Signup from "./Components/authComponent/Signup";
import Result from "./Components/quizz-game/Result";
import StartGame from "./Components/quizz-game/StartGame";
import AuthProvider from "./store/AuthProvider";
import QuestionProvider from "./store/QuestionProvider";
import LeaderBoard from "./Components/LeaderBoard";
//i//mport SocketProvider from "./store/SocketProvider";
//import initializeSocket from './store/Socket';
//import { useEffect } from "react";
const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children :[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/signup",
        element :<Signup/>
      },
      {
        path: "/add",
        element :<Question/>
      },
      {
        path:"/View",
        element :<QuestionArr/>
      },
      {
        path:"/update/:id",
        element:<Update/>
      },{
        path:"/all-game",
        element:<Games/>
      },{
        path:"/notification",
        element:<Notification/>
      },{
        path:"/game-start/:id/:gid",
        element:<StartGame/>
      },{
        path:"/result",
        element:<Result/>
      },{
        path:"/lobby/:game_id",
        element:<Lobby/>
      },{
        path:"/leaderBoard",
        element:<LeaderBoard/>
      }
    ]
  },
])

// REACT_APP_API_URL=https://quizz-backend-2.onrender.com
// REACT_APP_key = 2b5b650dfa9684407ff7
function App() {
  

  return( 
  <AuthProvider>
    <QuestionProvider>
      {/* //<SocketProvider> */}
        <RouterProvider router={router} />
        <ToastContainer />
      {/* </SocketProvider> */}
    </QuestionProvider>
  </AuthProvider>
  );
}

export default App