import React, { useState, useEffect } from 'react';
import './App.css';
import { Questionaire } from './components';


const PageTypes = {
  Welcome: 'Welcome',
  Question: 'Question',
  Correct: 'Correct',
  Wrong: 'Wrong',
}
const API_URL = "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple";
const LAST_QUESTION = 9;

function App() {
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [page, setPage] = useState(PageTypes.Welcome)


  useEffect(() => {
    if (questions != null)
      setQuestion(questions[currentQuestion]);
  }, [currentQuestion, questions]);

  useEffect(() => { console.log('CORRECT:', question?.correct_answer) }, [question])

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
      });
  }, []);

  const setAnswer = (answer) => {
    if (answer === question.correct_answer) {
      setPage(PageTypes.Correct);
    } else {
      setPage(PageTypes.Wrong);
    }
  };

  const getContent = () => {
    if (page === PageTypes.Correct)
      return (
        <>
          <h1>{question.correct_answer} is the correct answer!</h1>
          <h1>You have earned 100 points!</h1>
          <h1>Congratulations!</h1>
          <button onClick={() => next()}>Next</button>
        </>
      )
      if (page === PageTypes.Wrong)
      return (
        <>
          <h1>You failed!</h1>
          <h1>Score is {score} </h1>
          <h1>Try again!</h1>
          
        </>
      )
      if (page === PageTypes.Welcome)
      return (
        <>
          <h1>TRIVIA GAME</h1>
          <button onClick={() => next()}>Get Started</button>
        </>
      )
    return (
      <>
        <h1>{page}</h1>
        <button onClick={() => next()}>Next</button>
      </>
    )
  }

  
  const next = () => {
    switch (page) {
      case PageTypes.Correct:
        setScore(score + 100);
        setCurrentQuestion(currentQuestion + 1);
        setPage(PageTypes.Question);
        break;
      case PageTypes.Wrong:
        break;
      case PageTypes.Welcome:
        setPage(PageTypes.Question);

        break;
    }
  }

  return question != null ? (
    <div className='container'>
      <div className='header'>
        <h1>Score: {score}</h1>
        <div className='filler'></div>
        <h1>{currentQuestion + 1} / {LAST_QUESTION + 1}</h1>
      </div>
      <div className='content'>
        {page === PageTypes.Question ? (
          <Questionaire question={question} setAnswer={setAnswer} />
        ) : getContent()}
      </div>
    </div>
  ) : (
    <h1>No data</h1>
  );
}

export default App;
