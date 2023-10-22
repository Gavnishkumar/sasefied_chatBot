import React, { useState } from 'react'
import bg from '../Image/image.jpg';
import { BsFillChatDotsFill,BsXCircleFill} from "react-icons/bs";
import Chatbox from './Chatbox';
const Home = () => {
    const [openChat, setOpenChat]=useState(false);
    const handleOpenChat=()=>{
        setOpenChat(!openChat);
    }
  return (
    <div style={{height:'800px',background:`url(${bg})`,backgroundSize:'cover'}}>
    <div className='chatbot-toggler' onClick={handleOpenChat} style={{
  position: 'fixed',
  bottom: '30px',
  right: '35px',
  outline: 'none',
  border: 'none',
  height: '50px',
  width: '50px',
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: '#724ae8',
  transition: 'all 0.2s ease'
}}>
   {openChat ? <BsXCircleFill style={{fontSize:'2em'}}/>:<BsFillChatDotsFill style={{fontSize:'2em'}}/>}
      </div>
      {openChat && <Chatbox/>}
    </div>
  )
}

export default Home
