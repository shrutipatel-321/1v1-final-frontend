import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';
import { toast } from 'react-toastify';

function Header() {
  const {user_id,unsetCredHandler}=useContext(AuthContext);
  
  const navigate=useNavigate();
  const handleSubmit=(temp)=>{
    //function 
    //console.log("Yes");
    navigate(`${temp}`);
  }
  const logOut=()=>{
    unsetCredHandler();
    toast.success('Loggin out');
    navigate('/signup');
    //console.log(unsetCredHandler,user_id);
  }
  
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-200 px-4 py-3 uppercase sm:px-6">
      {user_id?(
        <>
        {/* home */}
        <button
          type="submit"
          className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={()=>handleSubmit('/')}
        >
        Home
        </button>
        {/* add question */}
        <button
          type="submit"
          className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={()=>handleSubmit('/add')}
        >
        Add-Question 
        </button>
        {/* edit-question */}
        
        {/* view question */}
      
        <button
          type="submit"
          className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={()=>handleSubmit('/View')}
        >
        View-Questions
        </button>

        <button
          type="submit"
          className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
           onClick={()=>handleSubmit('/all-game')}
        >
        all-games
        </button>

        <button
          type="submit"
           className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
            onClick={()=>handleSubmit('/notification')}
        >
        Notification
        </button>
        {/* add question */}
        <button
          type="submit"
          className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={()=>handleSubmit('/result')}
        >
        Result
        </button>
        <button
          type="submit"
          className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={()=>handleSubmit('/leaderBoard')}
        >
        LeaderBoard
        </button>
      <button
          type="submit"
           className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={logOut}
        >
       Logout
      </button>
      {/* //<SearchOrder /> */}
      {/* ?/<Username /> */}
      </>
      ):(
        <>
      <button
          type="submit"
            className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={()=>handleSubmit('/login')}
        >Login</button>
        <button
          type="submit"
           className="inline-block rounded-full bg-gradient-to-r from-blue-900 to-blue-400 font-normal text-sm uppercase tracking-wide text-stone-100 transition-colors duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed px-2"
          onClick={()=>handleSubmit('/signup')}
        >Signup</button>
      
      </>
      )
      }
    </header>
  );
}

export default Header;
