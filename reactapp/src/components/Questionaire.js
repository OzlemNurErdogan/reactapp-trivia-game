import React, { useEffect, useState } from "react";

const buttonStyle = {
  display: 'block',
  margin: '16px auto',
  width : '66%',
  minHeight: '32px',
  fontSize: '24px'
};

const Questionaire = (props) => {
  const {question, setAnswer} = props;
  const [shuffledAnswers, setShuffledAnswers] = useState(null);
 
  useEffect(() => {
      const answers = [question.correct_answer, ...question.incorrect_answers];
      answers.sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
  }, [question]);

  return (
    
      <div>
        <div>
          <h2 dangerouslySetInnerHTML={{__html:question.question}}></h2>
        </div>
        <div>
          {!shuffledAnswers ? (<p> Data is loading... </p>) :(
              shuffledAnswers.map(item => 
                (<button style={buttonStyle} key={item} onClick={() =>setAnswer(item)}>{item}</button>)
                )
          )}   
        </div>
        </div>
  ); 
}
export default Questionaire;
