import React from 'react'
import { Button } from 'react-bootstrap'
import ConnectedUsers from './ConnectedUsers'
import MessageContainer from './MessageContainer'
import SendMessageForm from './SendMessageForm'

const Chat = ({ messages, sendMessage, closeConnection, users }) => {

    console.log(messages)
    return (
        <div>
            <div className="leave-room">
                    <Button variant='danger'
                        onClick = {() => closeConnection()}>
                            Close
                        </Button>
                </div>
                <ConnectedUsers users={users} />
            <div className="chat">
                <MessageContainer  messages={messages}/>
                <SendMessageForm  sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat