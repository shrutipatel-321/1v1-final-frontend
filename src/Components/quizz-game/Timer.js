import { useEffect, useState } from "react";
import classes from "./index.module.css";
function Timer({dispatch}) {
    const[secondRemaning,setSeconRemaning]=useState(600*10);
    const mins=Math.floor(secondRemaning/60);
    const seconds=secondRemaning %60;
    useEffect(function(){
        const id = setInterval(function(){
            setSeconRemaning(secondRemaning-1);
       },1000);
       if(secondRemaning===0)
        dispatch({type:"finish"});
       return ()=>clearInterval(id);
    },[dispatch,secondRemaning]);
    return(
        <div className={`${classes.timer} ${mins===4 ? 'bg-red-500 text-white' : 'bg-green-500 text-black'}`}>
        {mins<10 &&"0"}
        {mins}:{seconds<10 && "0"}
        {seconds}
       </div>
    );
}

export default Timer
