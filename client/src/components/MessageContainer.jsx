import React, { useEffect, useRef } from 'react'

const MessageContainer = ({ messages }) => {

    const msgRef = useRef();
    useEffect(()=>{
        if(msgRef && msgRef.current ) {
            const { scrollHeight, clientHeight } = msgRef.current;
            msgRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: "smooth" })
        }
    }, [messages])

    return (
        <div className='message-container' ref={msgRef}>
            
            {
                messages && messages.map((item, index)=> (
                    
                    <div className='user-message'key={index}>
                        <div className='message bg-primary' >
                            {item.message}
                        </div>
                        <div className='from-user'>
                            {item.user}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MessageContainer