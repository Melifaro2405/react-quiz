import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY, QUIZ_SET_STATE
} from "./actionTypes";

export const fetchQuizes = () => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  }
};

export const fetchQuizById = (quizId) => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      fetchQuizesError(e);
    }
  }
}

export const fetchQuizSuccess = (quiz) => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
};

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START
  }
};

export const fetchQuizesSuccess = (quizes) => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
};

export const fetchQuizesError = (e) => {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
};

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
};

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ
  }
};

export const quizNextQuestion = (number) => {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  };
};

export const retryQuiz = () => {
  return {
    type: QUIZ_RETRY
  };
};

export const quizAnswerClick = (answerId) => {
  return (dispatch, getState) => {
    const state = getState().quiz;
    const {activeQuestion, answerState, quiz, results} = state;

    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'success') {
        return;
      }
    }

    const question = quiz[activeQuestion];

    if (question.rightAnswerId === answerId) {

      if (!results[question.id]) {
        results[question.id] = 'success';
      };

      dispatch(quizSetState({[answerId]: 'success'}, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results));
    }
  };
};

export const isQuizFinished = (state) => {
  return state.activeQuestion + 1 === state.quiz.length;
};