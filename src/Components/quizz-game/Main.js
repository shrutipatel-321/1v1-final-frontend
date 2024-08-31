import classes from "./index.module.css";
function Main({children}) {
    return (
        <main className={classes.main}>
            {children}
        </main>
    )
}

export default Main
