import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = ({answers, question, onAnswerClick, quizLength, answerNumber, state}) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{answerNumber}.</strong>&nbsp;
        {question}
      </span>

      <small>{answerNumber} из {quizLength}</small>
    </p>

    <AnswersList
      answers={answers}
      onAnswerClick={onAnswerClick}
      state={state}
    />
  </div>
);

export default ActiveQuiz;