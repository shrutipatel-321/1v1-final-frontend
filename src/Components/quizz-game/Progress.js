import classes from "./index.module.css";
function Progress({index,num,points,maxPoints ,answer}) {
    return (
        <header className={classes.progress}>
           <progress max={num} value={index +Number(answer!==null)} />
            <p>
              Question <strong>{index+1}</strong> / {num}
             
            </p>
            <p>
        <strong>{points}</strong> / {25}
           </p>
        </header>
    )
}

export default Progress
