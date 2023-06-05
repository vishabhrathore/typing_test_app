import React, { useEffect, useState, useRef } from "react";
import "./style.css"
import "../component/stopwatch.css"




const TypingApp = () => {
    const inputRef = useRef(null);
    const inpRef = useRef(null)
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [startTime, setStartTime] = useState(0)
    const [currInput, setCurrInput] = useState("")
    const [randoWords, setRandomWords] = useState([])
    const [worded, setworded] = useState([])
    const [currentInpindex, setCurrentInpindex] = useState(1)
    const [correct , setCorrect] = useState(0)
    const [Incorrect , setInCorrect] = useState(0)
    const [currChar , setCurrChar] = useState(1)
    const [numSpace, setSpace] = useState(1)
   
    function findIndexOfCharacter(arr ,num) {
        let count = 0;
      
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === " ") {
            count++;
            if (count === num) {
              return i;
            }
          }
        }
      }

   function generateRandomWords(length) {
        const sentences = []
        const characters = "asdfghjkl";
        const words = [];
        for (let i = 0; i < length; i++) {
            let word = "";
            const wordLength = Math.floor(Math.random() * 10) + 1; // Random word length between 1 and 10
    
            for (let j = 0; j < wordLength; j++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                word += characters[randomIndex];
                sentences.push(characters[randomIndex])
            }
            words.push(word);
            sentences.push(" ")
        }
        setworded(sentences)
        return words;
    }




  
    useEffect(() => {
      let interval = null;
  
      if (isRunning) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [isRunning]);
  
    const handleStartStop = () => {
        inputRef.current.focus();
        inpRef.current.focus();
       
      setIsRunning((prevState) => !prevState);
      if(!isRunning){
        start()
      }else{
        setStartTime(0)
      }
    };
  
    const handleReset = () => {
      setTime(0);
      setIsRunning(false);
      setStartTime(0)
      setRandomWords(generateRandomWords(200))
      window.location.reload()

    };
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${padTime(minutes)}:${padTime(seconds)}`;
    };
  
    const padTime = (value) => {
      return value.toString().padStart(2, '0');
    };

    useEffect(() => {
        setRandomWords(generateRandomWords(200))
    }, [])
  

    function start(){
        let startTime =  Date.now()
        setStartTime(startTime)
        console.log(startTime)
        console.log(worded)
        
    }
   
    const handleKeyDown = ({keyCode}) =>{
        let index = 0
        if(keyCode == 32){ 
            checkMatch()
            setCurrInput("")
            setCurrWordIndex(currWordIndex+1)
        }
        if(keyCode == 8){
         setCurrentInpindex(currentInpindex -1)
        if(worded[currentInpindex]== "a")
        setCurrChar(1)
        if(worded[currentInpindex]== "s")
        setCurrChar(2)
        if(worded[currentInpindex]== "d")
        setCurrChar(3)
        if(worded[currentInpindex]== "f")
        setCurrChar(4)
        if(worded[currentInpindex]== "g")
        setCurrChar(5)
        if(worded[currentInpindex]== "h")
        setCurrChar(6)
        if(worded[currentInpindex]== "j")
        setCurrChar(7)
        if(worded[currentInpindex]== "k")
        setCurrChar(8)
        if(worded[currentInpindex]== "l")
        setCurrChar(9)
        }
        else{
        if(worded[currentInpindex]== "a")
        setCurrChar(1)
        if(worded[currentInpindex]== "s")
        setCurrChar(2)
        if(worded[currentInpindex]== "d")
        setCurrChar(3)
        if(worded[currentInpindex]== "f")
        setCurrChar(4)
        if(worded[currentInpindex]== "g")
        setCurrChar(5)
        if(worded[currentInpindex]== "h")
        setCurrChar(6)
        if(worded[currentInpindex]== "j")
        setCurrChar(7)
        if(worded[currentInpindex]== "k")
        setCurrChar(8)
        if(worded[currentInpindex]== "l")
        setCurrChar(9)
        if(worded[currentInpindex]== " ")
        setCurrChar(10)
    }
    setCurrentInpindex(currentInpindex + 1)
    }
    
    const checkMatch = ()=>{
        const wordCompare = randoWords[currWordIndex]
        const doesItMatch = wordCompare == currInput.trim()
        if(doesItMatch){
            setCorrect(correct + 1)
        }else{
            setInCorrect(Incorrect + 1  )
        }
    }

    return (
        <div className="main">
            <header>Typing Test</header>
            <div className="flex">
                <div className="sidebar">
                    <div className="card">
                        <div className="head">Accuracy :</div>
                        <div className="meter">{isRunning ? <span>{Math.round((correct / (correct + Incorrect))*100)}</span> : <span>0</span> } %</div>
                    </div>
                    <div className="card">
                        <div className="head">WPM :</div>
                        <div className="meter">{Math.round((correct / (Date.now() - startTime))*1000*60)}</div>
                    </div>
                    <div className="card">
                    <div className="timer">{formatTime(time)}</div>
                    </div>
                </div>
                <div className="words">{
                randoWords.map((word, i)=>(
                    <span key={i+1}>
                    <span>
                        {word.split("").map((char, idx)=>(
                            <span key={idx}>{char}</span>
                        ))}
                    </span>
                    <span> </span>
                    </span>
                )
                )
                }
                </div>
            </div>
            <div className="board">
               {
                    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', "Space"].map((key, ind) => {
                        return (
                            <div key={ind+1}>
                                <div style={currChar === ind+1 ? { backgroundColor : 'green' } : null} className="key">
                                    <span className="key-label">{key}</span>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
            <div ref={inpRef} className="inp">
                <input ref={inputRef} type="text" onKeyDown={handleKeyDown} value={currInput} onChange={(e)=>{setCurrInput(e.target.value)}}/>
            </div>
            <div className="btn">
            <div className="button-group">
                <button className={`start-stop-button ${isRunning ? 'stop' : 'start'}`} onClick={handleStartStop}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>
            </div>

        </div>
    )
}


export default TypingApp