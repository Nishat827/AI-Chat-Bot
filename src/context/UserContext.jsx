import React, { createContext, useState } from 'react'
import run from '../gemini';
export const dataContext = createContext();

const UserContext = ({ children }) => {

    let [speaking, setSpeaking] = useState(false);
    let [text, setText] = useState("listening...");
    let [response, setResponse] = useState(false);

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);

        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-GB";

        window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(prompt) {
        let text = await run(prompt);
        let newText = text.split("**") && text.split("*") && text.replace("google", "Nishat Alam") && text.replace("Google", "Nishat Alam");
        setText(newText);
        speak(newText);
        setResponse(true);
        setTimeout(() => {
            setSpeaking(false);
        }, 6000)

    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition();
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        setText(transcript)
        takeCommand(transcript.toLowerCase());
    }

    function takeCommand(command) {

        if (command.includes("open") && command.includes("youtube")) {

            window.open("https://www.youtube.com/", "_blank");
            speak("openning Youtube");
            setResponse(true);
            setText("Opening Youtube...");
            setTimeout(() => {
                setSpeaking(false);
            }, 6000)
        }
        else if (command.includes("open") && command.includes("google")) {

            window.open("https://www.google.com/", "_blank");
            speak("openning google");
            setResponse(true);
            setText("Opening Google...");
            setTimeout(() => {
                setSpeaking(false);
            }, 6000)
        }
        else if (command.includes("time")) {
            let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
            speak(time)
            setResponse(true);
            setText(time)
            setTimeout(() => {
                setSpeaking(false);
            }, 6000)
        }
        else if (command.includes("date")) {
            let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
            speak(date)
            setResponse(true);
            setText(date)
            setTimeout(() => {
                setSpeaking(false);
            }, 6000)
        }
        else {
            aiResponse(command);
        }
    }
    let value = {
        recognition,
        speaking,
        setSpeaking,
        text,
        setText,
        response,
        setResponse
    }
    return (
        <div>
            <dataContext.Provider value={value}>
                {children}
            </dataContext.Provider>
        </div>
    )
}

export default UserContext