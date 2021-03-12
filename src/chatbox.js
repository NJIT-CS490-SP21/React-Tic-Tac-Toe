import { useState, useRef, useEffect } from 'react';
export function ChatBox(props)
{
    const inputRef = useRef(null);
    const [ chat, setChat ] = useState([]);
    
    function clickHandler()
    {
        const userChat = inputRef.current.value;
        inputRef.current.value = '';
        
        if(userChat !== '')
        {
            setChat(prevList => [...prevList, (props.user + ': ' + userChat)]);
            
            props.socket.emit('chat', {chat: (props.user + ': ' + userChat)});
        }
    }
    
    useEffect(() => {
        props.socket.emit('currentChat', 'getChat');
        
        props.socket.on('currentChat', (data) => {
            console.log(data);
            
            setChat((prevData) => {
            let newBoard = [...prevData];
            newBoard = data.board;
            return newBoard;
            });
        });
        
    }, []);
    
    useEffect(() => {
        
        props.socket.on('chat', (data) => {
             setChat(prevList => [...prevList, data.chat ]);
        });
        
    }, []);
    
    return (
        <div className="chatBox" >
            <h1 className='user_h1'>Chat</h1>
            <div className="chat">
            {chat.map((item, index) => {
                
                return (
                    <div><p>
                        {item}
                    </p></div>
              );
            })}
            </div>
            <input className="chatInput" ref={inputRef} type="text" placeholder="Type message..."/>
            <button className="chatButton" type="submit" onClick= {clickHandler}>Submit</button>
        </div>
    );
}