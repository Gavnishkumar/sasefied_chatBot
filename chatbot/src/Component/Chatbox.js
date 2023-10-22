import React, {  useEffect, useRef, useState } from 'react'
import MessageTemp from './MessageTemp'
import { validatePhoneNumber,validateEmail } from '../Functions/MyFunctions';
import axios from 'axios';
const mydata={
  "anyHarassment":'',
  "safe":'',
  "organization":'',
  "name":'',
  "location":'',
  "contactNumber":'',
  "email":'',
  "employeeOrStudentId":'',
  "isEthnicMinority":'',
  "gender":'',
  "assaulted":'',
  "oneOffIncident":'',
  "dateOfIncident":'',
  "nameOfAssaulter":'',
  "reportAnonymously":'',
  "reportToManagement":'',
  "locationOfIncident":''
}
const Chatbox = () => {
  const [userResponse, setUserResponse] = useState("");
  const [index, setIndex] = useState(1);
  const [answer,setAnswer]=useState([""]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const bottomRef = useRef(null);
    useEffect(() => {
        // Update screenWidth when the window is resized
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
        
        return () => {
          // Remove the resize event listener when the component unmounts
          window.removeEventListener('resize', handleResize);
        };
      }, );
      
      const chatBotWidth= screenWidth < 768 ? '90%' : '470px';
      const chatBotPosition= screenWidth < 768 ? '20px' : '35px';
  const predefinedQuestions = [
    "Hi 👋, my name is Mr Safe. How can I help you today?🤔",
    "1. Sexual Harassment \n 2. Rape\n3. Harassment\n4. Hate Crime",
    "Before we go further, we need to know about you. Please help us by answering some questions",
    "Are you currently safe? Yes/No",
    "Which organization or university do you work for or study in? (Eg. - Sasefied, FoodPiazza)",
    "What is your name?",
    "Where are you based? (Eg.- India, United Kingdom, USA)",
    "What is your contact number?",
    "What is your email address?",
    "What is your employee or student id?",
    "Do you recognize as an ethnic minority? Yes/No",
    "Your Gender? M/F/Others",
    "Are you assaulted? Yes/No",
    "Was it a one-off incident? Yes/No",
    "Date of incident(s)?",
    "Location of incident",
    "Name of person(s) who assaulted you?",
    "Would you like to report anonymously or with your details? Yes/No",
    "Would you like to report this to management? Yes/No",
    "Thankyou so much! Our team would contact you soon",
  ];
  const [divElement,setDivElement]= useState([<MessageTemp IAmSending={true} scrollableRef={bottomRef} message={predefinedQuestions[0]} />,<MessageTemp IAmSending={true} scrollableRef={bottomRef} message={predefinedQuestions[1]} />]);
 
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [divElement]);
const SaveResponses=async ()=>{
   try {
     const headers = {
      'Content-Type': 'application/json',
    };
    await axios.post('http://localhost:4000/api/createQuery',mydata,{headers});
   } catch (error){
      console.log(error);
   }
  }
  const handleSaveResponse = () => {
    switch (index) {
      case 1:{
          setAnswer((answer) => [...answer, userResponse,""]);
          mydata.anyHarassment=userResponse;
          setDivElement([...divElement,[<MessageTemp IAmSending={false} scrollableRef={bottomRef} message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef} message={predefinedQuestions[index+1]}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[index+2]}/>]])
          setIndex(3);
          console.log(mydata) 
      }
        break;
      case 3:{
        if(userResponse.toLowerCase()==="no"){
          
          mydata.safe=userResponse
          setAnswer([...answer,userResponse]);
          setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef} message={userResponse}/>,<MessageTemp IAmSending={true}  scrollableRef={bottomRef}  message={"Please call on 999"}/>])
          SaveResponses();
          setIndex(20)
          break;
        }
        else{
          mydata.safe=userResponse
            setAnswer([...answer,userResponse]);
            setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef} message={userResponse}/>,<MessageTemp IAmSending={true}  scrollableRef={bottomRef}  message={predefinedQuestions[4]}/>])
            
            setIndex(4);
        }
      }
        break;
      case 4:{
        mydata.organization=userResponse
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef} message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[5]}/>])
        setIndex(5);
      }
        break;
      case 5:{
        mydata.name=userResponse
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false}  scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true}  scrollableRef={bottomRef}  message={predefinedQuestions[6]}/>])
        setIndex(6);
      }
        break;
      case 6:{
        mydata.location=userResponse;
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true}  scrollableRef={bottomRef}  message={predefinedQuestions[7]}/>])
        setIndex(7);
      }
        break;
      case 7:{
        if(!validatePhoneNumber(userResponse)){
          setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true}  scrollableRef={bottomRef}  message={"please provide correct phone numner(i.e of 10 digits)"}/>])
        }else{
          mydata.contactNumber=userResponse;
          setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[8]}/>])
          setAnswer([...answer,userResponse]);
          setIndex(8);
        }
      }
        break;
      case 8:{
        if(!validateEmail(userResponse)){
          setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={"please provide correct email address(Ex. abc@bcd.ckd"}/>])
        }else{
          mydata.email=userResponse;
          setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[9]}/>])
          setAnswer([...answer,userResponse]);
          setIndex(9);
        }
      }
        break;
      case 9:{
        mydata.employeeOrStudentId=userResponse;
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[10]}/>])
        setIndex(10);
      }
        break;
      case 10:{
        mydata.isEthnicMinority=userResponse;
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[11]}/>])
        setIndex(11);
      }
        break;
      case 11:{
        mydata.gender=userResponse;
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[12]}/>])
        setIndex(12);
      }
        break;
      case 12:{
        mydata.assaulted=userResponse;
        if(userResponse.toLowerCase()==="no"){
          setAnswer([...answer,userResponse,"","","",""]);
          setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef} message={predefinedQuestions[17]}/>])
            setIndex(17);
        }
        else{
          setAnswer([...answer,userResponse]);
          setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[13]}/>])
          setIndex(13);
        }
      }
        break;
      case 13:{
        mydata.oneOffIncident=userResponse
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[14]}/>])
        setIndex(14);
      }
        break;
      case 14:{
        mydata.dateOfIncident=userResponse;
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[15]}/>])
        setIndex(15);
      }
        break;
      case 15:{
        mydata.locationOfIncident=userResponse;
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[16]}/>])
        setIndex(16);
      }
        break;
      case 16:{
        mydata.nameOfAssaulter=userResponse
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[17]}/>])
        setIndex(17);
      }
        break;
      case 17:{
        mydata.reportAnonymously=userResponse;
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}  message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[18]}/>])
        setIndex(18);
      }
        break;
      case 18:{
        mydata.reportToManagement=userResponse
        setAnswer([...answer,userResponse]);
        setDivElement([...divElement,<MessageTemp IAmSending={false} scrollableRef={bottomRef}   message={userResponse}/>,<MessageTemp IAmSending={true} scrollableRef={bottomRef}  message={predefinedQuestions[19]}/>])
        SaveResponses();
        setIndex(20);
        
      }
        break;
      default:
        break;
    }
    
   setUserResponse('');
  }
const handleSaveResponseByKey=(e)=>{
  if(e.key==="Enter"){
      handleSaveResponse();
  }
}
  return (
    <div style={{
      height: '80%', position: 'fixed',
      right: `${chatBotPosition}`,
      bottom: '90px',
      width: `${chatBotWidth}`,
      background: '#fff',
      borderRadius: '15px',
    }}>
      <header style={{ height: '15%', background: '#724ae8', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white'}}>
        <h2>ChatBot</h2>
      </header>
      <div style={{height:"70%",overflowY:'scroll'}}>
          {divElement}
          <div ref={bottomRef}/>
      </div>
      <div style={{height:'15%', width:'90%',margin:'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input type='text'  onKeyDown={handleSaveResponseByKey} placeholder='Enter your message..' onChange={(e) => setUserResponse(e.target.value)} value={userResponse} style={{ width: '100%', height: '40px',fontSize: '18px', border: '1px solid grey',borderRadius:'8px', padding: '10px'}} />
        <span id="send-btn" onClick={handleSaveResponse} style={{ background: '#724ae8', padding: '10px', borderRadius: '12px', margin: '0px 9px',cursor:'pointer'}} className="material-symbols-rounded">
          send</span>
      </div>
    </div>
  )
}
export default Chatbox
