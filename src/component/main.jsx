import React, { useEffect, useState, useRef } from "react";
import "./style.css"
import "../component/stopwatch.css"
import randomSentence from "random-sentence";


const TypingApp = () => {
    const inputRef = useRef(null);
    const inpRef = useRef(null)

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [startTime, setStartTime] = useState(0)
    const [currInput, setCurrInput] = useState("")
    const [randoWords, setRandomWords] = useState([])
    const [correct, setCorrect] = useState(0)
    const [Incorrect, setInCorrect] = useState(0)
    const [currCharIndex, setcurrCharIndex] = useState(0)
    const [input, setInput] = useState("")
    const [checkerInp, setCheckerInp] = useState("")
    const [isFinished, setFinished] = useState(false)


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
        if (!isRunning) {
            start()
        } else {
            setStartTime(0)
        }
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
        setStartTime(0)
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
        let str = ""
        let arr2 = []
        for (let i = 0; i < 18; i++) {
            str += randomSentence({ words: 10 })
            str += " "
        }

        setCheckerInp(str.split(" "))

        console.log(checkerInp)
        let arr = str.split(" ")

        for (let i = 0; i < arr.length; i++) {
            let arr1 = arr[i].split("")
            for (let j = 0; j < arr1.length; j++) {
                arr2.push(arr1[j])
            }
            arr2.push(" ")
        }

        setRandomWords(arr2)
    }, [])


    function start() {
        let startTime = Date.now()
        setStartTime(startTime)
        console.log(startTime)
        console.log(randoWords)

    }

    const handleKeyDown = (e) => {

        if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode == 190) {

            setInput((prev) => prev + e.key)
            setcurrCharIndex(currCharIndex + 1)

        }
        if (e.keyCode == 32) {

            checkMatch()
            setCurrWordIndex(currWordIndex + 1)
            setInput((prev) => prev + " ")
            setcurrCharIndex(currCharIndex + 1)


        }
        if (e.key == "Backspace") {
            if (currWordIndex == 0 && currCharIndex == 0) {
                return
            }
            if (currWordIndex == 0 && currCharIndex >= 0) {
                setInput((prev) => prev.slice(0, -1))
                setcurrCharIndex(currCharIndex - 1)
                return
            }
            if (input[currCharIndex - 1] == " ") {
                setCurrWordIndex(currWordIndex - 1)
            }

            setInput((prev) => prev.slice(0, -1))
            setcurrCharIndex(currCharIndex - 1)

        }

    }
    const print = () => {
        console.log("input : " + input)
        console.log("currWord : " + currWordIndex)
        console.log("currCharIndex : " + currCharIndex)
    }

    const checkMatch = () => {
        const wordCompare = checkerInp[currWordIndex]
        const doesItMatch = wordCompare == currInput.trim()
        if (doesItMatch) {
            setCorrect(correct + 1)
        } else {
            setInCorrect(Incorrect + 1)
        }
        if (checkerInp[checkerInp.length - 1] == checkerInp[currWordIndex]) {
            setFinished(true)
        }
        setCurrInput("")
    }

    return (
        <div className="main">
            <header>Typing Test</header>
            {isFinished ?
                <div style={{display:"flex", justifyContent:"space-evenly"}}>
                    <div className="card">
                        <div className="head">Accuracy :</div>
                        <div className="meter">{isRunning ? <span>{Math.round((correct / (correct + Incorrect)) * 100)}</span> : <span>0</span>} %</div>
                    </div>
                    <div className="card">
                        <div className="head">WPM :</div>
                        <div className="meter">{Math.round((correct / (Date.now() - startTime)) * 1000 * 60)}</div>
                    </div>
                </div>
                :
                <div className="flex">
                    <div className="sidebar">
                        <div className="card">
                            <div className="head">Accuracy :</div>
                            <div className="meter">{isRunning ? <span>{Math.round((correct / (correct + Incorrect)) * 100)}</span> : <span>0</span>} %</div>
                        </div>
                        <div className="card">
                            <div className="head">WPM :</div>
                            <div className="meter">{Math.round((correct / (Date.now() - startTime)) * 1000 * 60)}</div>
                        </div>
                        <div className="card">
                            <div className="timer">{formatTime(time)}</div>
                        </div>
                    </div>
                    <div className="words">{

                        randoWords.map((word, i) => (
                            <span
                                key={word + i}
                                style={{ color: input[i] === undefined ? 'white' : input[i] === word ? 'yellowgreen' : 'red' }}
                            >{word}</span>
                        )
                        )
                    }
                    </div>
                </div>
            }
            {/* <div className="board">
                {
                    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', "Space"].map((key, ind) => {
                        return (
                            <div key={ind + 1}>
                                <div className="key">
                                    <span className="key-label">{key}</span>
                                </div>
                            </div>
                        )
                    })

                }
            </div> */}
            <div ref={inpRef} className="inp">
                <input ref={inputRef} type="text"
                    value={currInput}
                    onKeyDown={handleKeyDown}
                    onKeyUp={print}
                    onChange={(e) => {
                        setCurrInput(e.target.value);

                    }}
                />
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