import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import pusher from "../../PusherConfig";
import AuthContext from "../../store/AuthContext";
import Button from '../Utils/Button';
function Header(receiver_id) {
  const {user_id}=useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showForm,setShowForm]=useState(false);
  const [showMessage,setShowMessage]=useState(false);
  useEffect(()=>{
     if(user_id){
      const channel = pusher.subscribe(`private-${user_id}`);

      channel.bind('pusher:subscription_succeeded', () => {
        //console.log(`Subscribed to private-${user_id}`);
      });

      channel.bind('message', function (data) {
        //console.log(data);
        setMessages((messages) => [...messages, data]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
     }
  },[user_id]);
  const sendMessage = async () => {
    //e.preventDefault();
    if (message && user_id && receiver_id) {
      await axios.post(`${process.env.RE}/messages`, {
        sender: user_id,
        receiver:receiver_id.gid,
        message,
      });
      setMessage('');
      setShowForm(false);
    }
  };
  const handleChange=(e)=>{
      setMessage(e.target.value);
  }
  const handleSubmit=async (e)=>{
     e.preventDefault();
     await sendMessage()
  }
  //console.log(messages);
  return (
    <header className="my-4 px-4 flex flex-row justify-between">
    <Button type="small" onClick={()=>setShowForm(true)}>Send Message</Button>
      {showForm &&<div className='my-2 rounded border-2 border-blue-100'>
        <form>
          <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
          className={`border  border-blue-500 mx-2 my-1`}
        />
        <br/>
        <button type="submit" className="bg-blue-400 my-1 rounded-full text-white text-sm" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      }
      <Button type="small" onClick={()=>setShowMessage(true)}>Show message</Button>
      {showMessage && (
      <div className="bg-red-100 w-1/4"onClick={()=>setShowMessage(false)}>
        <ul>
      {messages.map((msg, index) => (
        <li className="font-semibold"key={index}>{msg.message}</li>
      ))}
        </ul>
      </div>
      )}
      {/* <h1 className="mx-auto py-4">Welcome to  Quiz ....</h1>
      <h2 className="mb-8  text-xl font-semibold md:text-3xl py-4 text-red-500 my-4">You can start the quizz in 0 second</h2> */}
    </header>
  );
}

export default Header;
