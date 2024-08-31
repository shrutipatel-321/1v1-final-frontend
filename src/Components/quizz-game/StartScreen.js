import Button from "../Utils/Button";
function StartScreen({num,dispatch}) {
    //console.log(num);
    return (
        <>
        <div className="border-2 border-yellow-500 rounded p-4 mx-auto">
            <h1 className="text-center mb-8  text-xl font-semibold md:text-3xl py-2">Rules</h1>
            <ul className="list-decimal pl-4">
            <li>You will get {num * 5} minutes to complete all questions</li>
            <li>Any kind of malpractice will lead to a ban from this app</li>
            <li>You will get 2 minutes to solve each question</li>
            <li>Once an answer is marked, you cannot change it</li>
            <li>3 wrong answers will lead to finishing the quiz</li>
            </ul>
        </div>
        <div className="mx-auto my-6">
            <Button type="small" onClick={()=>dispatch({
            type:"start"
            })}>
                Lets start
            </Button>
            </div>
        </>
       
    );
}

export default StartScreen
