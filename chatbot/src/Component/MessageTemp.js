import React, { useEffect, useState } from 'react'
import SmsSharpIcon from '@mui/icons-material/SmsSharp';
const MessageTemp = (props) => {
  const [msg, setMsg] = useState('');
  // const scrollToBottom=ContextState()
  const [typing, setTyping] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setTyping(false);
    }, 1000);
    let currentIndex = 0;
    if (props.IAmSending === true && typing === false) {
      const typingInterval = setInterval(() => {
        if (currentIndex <= props.message.length) {
          setMsg(props.message.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [typing]);
  useEffect(() => {
    props.scrollableRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msg]);

  return (
    <>
      {typing && props.IAmSending ?
        <SmsSharpIcon style={{
          display: `${props.IAmSending ? "flex" : "none"}`,
          width: '30px',
          height: '30px',
          color: '#fff',
          cursor: 'default',
          textAlign: 'center',
          lineHeight: '40px',
          alignSelf: 'flex-end',
          background: '#724ae8',
          borderRadius: '4px',
          fontSize: '2em',
          margin: '50px 0px 0px 20px',
        }} />
        : <div style={{
          display: 'flex',
          justifyContent: `${props.IAmSending ? "flex-start" : "flex-end"}`
        }}>
          <div style={{ display: 'flex', width: '70%', justifyContent: `${props.IAmSending ? "flex-start" : "flex-end"}` }}>
            <span className="material-symbols-outlined" style={{
              display: `${props.IAmSending ? "flex" : "none"}`,
              width: '40px',
              height: '40px',
              color: '#fff',
              cursor: 'default',
              textAlign: 'center',
              lineHeight: '40px',
              alignSelf: 'flex-end',
              background: '#724ae8',
              borderRadius: '4px',
              fontSize: '2em',
              margin: '0px 0px 0px 20px',
            }}>smart_toy</span>
            {<p style={{
              background: `${props.IAmSending ? '#ccc' : '#724ae8'}`, color: `${props.IAmSending ? 'black' : 'white'}`, margin: '20px 10px 0px',
              padding: '10px 10px 5px',
              borderRadius: '10px 10px 10px 0px',
              textAlign: 'left',
            }}>{props.IAmSending ? msg : props.message}</p>}
          </div>
        </div>}
    </>
  )
}

export default MessageTemp
