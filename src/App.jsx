import { useContext, useState } from 'react'
import './App.css'
import Va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/UserContext';
import speakIMG from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";


function App() {
  let { recognition, speaking, setSpeaking, text, setText, response, setResponse } = useContext(dataContext);


  return (
    <>
      <div className='main' >
        <img src={Va} alt='' id='bilkis' />
        <span>I'm Bilkis, Your Advanced Virtual Assistant</span>
        {!speaking ? <button onClick={() => {
          setText("listening...");
          setSpeaking(true);
          setResponse(false);
          recognition.start()
        }}>Click here<CiMicrophoneOn /></button> :
          <div className='response'>
            {!response ? <img src={speakIMG} alt='' id="speakimg" /> :
              <img src={aigif} alt='' id="aigif" />

            }
            <p>{text}</p>
          </div>
        }

      </div>
    </>
  )
}

export default App
