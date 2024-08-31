function NextButton({dispatch,answer,index,wrongans,num,gid}) {
    //console.log(wrongans);
    if(index<4&&wrongans<3)return (
        <button 
        className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50 "
        onClick={()=>dispatch({
            type:'moveNextQuestion'
        })}
        >
        Next
        </button>
    );
    else
    return (
     <button
    className="float-left text-[1.2rem] text-white border-2  p-2 px-4 rounded-full bg-green-500 "
     onClick={()=>dispatch({type:"finish"})}
     >
     Finish
     </button>
    )

}

export default NextButton
