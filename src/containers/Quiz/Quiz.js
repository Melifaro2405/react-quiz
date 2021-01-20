import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  };

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    const {quiz, activeQuestion, answerState, isFinished, results, loading} = this.props;

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          {
            loading || !quiz
            ? <Loader />
            : isFinished
              ? <FinishedQuiz
                results={results}
                quiz={quiz}
                onRetry={this.props.retryQuiz}
              />
              : <ActiveQuiz
                answers={quiz[activeQuestion].answers}
                question={quiz[activeQuestion].question}
                onAnswerClick={this.props.quizAnswerClick}
                quizLength={quiz.length}
                answerNumber={activeQuestion + 1}
                state={answerState}
              />
          }

        </div>
      </div>
    );
  };
};

const mapStateToProps = ({quiz}) => {
  return {
    results: quiz.results,
    isFinished: quiz.isFinished,
    activeQuestion: quiz.activeQuestion,
    answerState: quiz.answerState,
    quiz: quiz.quiz,
    loading: quiz.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
