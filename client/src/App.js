
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";
import Chat from './components/Chat';


function App() {

  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async(user, room) =>{

    try {
      
      const connection = new HubConnectionBuilder()
                          .withUrl("https://localhost:44314/chat")
                          .configureLogging(LogLevel.Information)
                          .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, {user, message}]);
      })

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      })

      connection.onclose( e => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
      })

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);

    } catch (e) {
      console.log(e)
    }

  }

  const sendMessage = async(message) =>{
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error)
    }
  }

  const closeConnection = async() => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="app">
        <h2>Mychat</h2>
        {
          !connection ? <Lobby  joinRoom={joinRoom}/> : 
          <Chat 
            messages={messages} 
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
            />
        }
        

    </div>
  );
}

export default App;
