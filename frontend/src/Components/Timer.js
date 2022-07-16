import React from 'react'
import { useState, useEffect } from 'react';

const Timer = (props) => {
    // const { initialHour, initialMinute, initialSeconds } = props;
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    // console.log(props)
    // console.log(`Timer original: ${hours} : ${minutes} : ${seconds}`)

    useEffect(() => {
        setHours(parseInt(props.initialHour))
        setMinutes(parseInt(props.initialMinute))
        setSeconds(parseInt(props.initialSeconds))
    }, [props.initialHour, props.initialMinute, props.initialSeconds])

    useEffect(() => {
        let myInterval = setInterval(() => {
            setSeconds((prev) => prev + 1)

            if (seconds === 59) {
                setMinutes((prev) => prev + 1)
                setSeconds(0)
            }

            if (minutes === 59) {
                setMinutes(0)
                setHours((prev) => prev + 1)
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    // useEffect(()=>{
    //     console.log("Timer.js > postUserTime")
    //     console.log(`QuizId: ${props.quizId} QuestionId: ${props.questionId} Timer: ${hours} : ${minutes} : ${seconds}`)
    // }, [props.qnum])

    return(
        <>
            <span>{hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}</span>
        </>
    )
    
}

export default Timer;
