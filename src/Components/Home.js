import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthContext from "../store/AuthContext";
import initializeSocket from "../store/Socket";
import Button from "./Utils/Button";
//const Socket=initializeSocket();
//import Signup  "../Components/authComponent/Signup"

// REACT_APP_API_URL= https://quizz-backend-2.onrender.com
// REACT_APP_key = 2b5b650dfa9684407ff7

const handleClick=async(token,user_id,game)=>{
  try{
    //console.log(game);
    const response=await fetch(`${process.env.REACT_APP_API_URL}/api/game/create-game`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify({user_id:user_id,gamename:game}),
    });
    const result=await response.json();
    //console.log(result);
    if (!result.status||result.status!=='sucess') {
        throw new Error(result.message);
    }
    toast.success('Game created');
  }catch(err){
     toast.error("Game cannot be created");
     //console.log(err);
  }
}
function Home() {
    //const {token}=useContext(AuthContext);

    const {token,user_id}=useContext(AuthContext);
    const [game,setGame]=useState('');
    const navigate=useNavigate();
    // if(Socket)
    //   console.log("Socket ready");
    useEffect(() => {
        if (!user_id) {
          navigate('/signup');
        }
      }, [user_id]);
      useEffect(() => {
        //  const user_id = localStorage.getItem('user_id');
        //  const token = localStorage.getItem('token');
         
        //console.log(user_id,token);
        //Ensure user_id and token are set before initializing the socket
        if (user_id && token) {
          const socket = initializeSocket(user_id,token,'Home');
          //setSocket();
          // You can use the socket here or set it in state/context for further use
          //console.log(user_id,token);
          socket.on('connect', () => {
            //console.log('Socket connected');
          });
        } else {
          //console.error('User ID or token is missing');
        }
      }, [user_id,token]);
      const handleChange=(e)=>{
        setGame(e.target.value);
      };
      const handleSubmit = async (e) => {
         e.preventDefault();
         await handleClick(token,user_id,game);
      }
      console.log(process.env.REACT_APP_API_URL);
    return (
        <div className="my-10 px-4 text-center sm:my-16">
        <p className="mx-auto py-4">
        👋 Welcome! Please start by creating a game:
        </p>
        <h1 className="mb-8  text-xl font-semibold md:text-3xl py-4">
        Join 1v1 MCQ GAME.
        <br />
        <span className="text-red-500 my-4">
          Show them your knowledge.
        </span>
      </h1>
      <form className="mx-auto w-1/2  p-8 rounded mt-12">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        
        <label htmlFor="game" className="sm:basis-40">

          Game Name
        </label>
        <input
          type="text"
          id="game"
          name="game"
          value={game}
          onChange={handleChange}
          className={`input grow `}
        />
      </div>
        {game !== '' && (
        <div>
          <Button type="small" onClick={handleSubmit}>Create Game</Button>
        </div>
        )}
         </form>
         
         </div>
    )
}
export default Home
