/* eslint-disable max-len */
// == React Import
import React, { useEffect, useState } from 'react';

// Material UI Import for closing button
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

// CSS import

import './quiz.scss';

// Proptypes import

import PropType from 'prop-types';

// == Components Import

import Card from './Card/Card';

import fullQuiz from './quizdata.json';

const Quiz = (
  // {
  // fullQuiz, getQuiz, saveScores, saveCurrentQuiz,
  // }
) => {

  // This state index is used to determine which current question it is
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Score counter
  const [score, setScore] = useState(0);

  // State array filing all the ids of answers selected by user

  const [allAnswers, setAllAnswers] = useState([]);

  // State array with "Correct" and "Incorrect" for each question, used to display final score
  const [countCorrectAnswers, setCountCorrectAnswers] = useState([]);

  // Boolean used to determine if the user has been through every question and then display a 'Confirm' button
  const [isComplete, setIsComplete] = useState(false);

  // Boolean to close or open quiz when clicking on exit button
  const [openQuiz, setOpenQuiz] = useState(true);

  // Local state to determine which quiz to select
  const [quizIndex, setQuizIndex] = useState(0);
  // Triggers axios request with middleware after 1st render

  // useEffect(() => {
  //   getQuiz();
  // }, []);

  // Gets first quiz in the array of quizzes sent back by Axios
  const firstQuiz = fullQuiz[quizIndex];

  // Condition to prevent error on first render
  if (!firstQuiz) {
    return '';
  }

  // Retrieves all questions from first quiz
  const allQuestions = firstQuiz.questions;

  // Retrieves one specific question (and all data related) according to current index
  const question = allQuestions[currentQuestionIndex];

  // Changes current question index when clicked on "Suivant" (next)
  const nextQuestion = () => {
    const nextQuestionGo = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionGo);
  };

  // Callback function to move on to next quiz
  const nextQuiz = () => {
    const newQuiz = quizIndex + 1;
    setQuizIndex(newQuiz);
    setIsComplete(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCountCorrectAnswers([]);
  };

  // Callback function adding answers ids to array

  const saveNewAnswer = (answers) => {
    setAllAnswers([...allAnswers, answers]);
  };

  // Callback function adding "Correct" or "Incorrect" in an array for final score display
  const countAnswers = (boolean) => {
    setCountCorrectAnswers([...countCorrectAnswers, boolean]);
  };

  // quiz id to send score in database 
  // const thisQuiz = quizIndex + 1;

  // Final function when clicking on "Valider" (confirm) : sets complete boolean to true
  const getResults = () => {
    setIsComplete(true);
    // Saves current quiz score in state
    // saveCurrentQuiz(thisQuiz, score);
    // Saves score in database, retrieves data from state
    // saveScores();
  };

  // Increments score
  const increaseScore = () => {
    const newScore = score + 1;
    setScore(newScore);
  };

  const closeQuiz = () => {
    setOpenQuiz(false);
  };

  // Boolean to determine whether it's last question / time to display "Valider" (confirm) button
  const isLastQuestion = currentQuestionIndex + 1 === allQuestions.length;

  const stillQuiz = quizIndex < fullQuiz.length - 1;

  return (

    <div className={`quiz ${openQuiz ? '' : 'hidden'}`}>
      {/* <CancelRoundedIcon className="closequiz" onClick={closeQuiz} /> */}

      {isComplete && (
      <div className="quiz-results">
        <p className="quiz-score"> Score : {score}/8 </p>
        {countCorrectAnswers.map((answer, index) => (

          <p className="quiz-answers" key={`questionresult-${index}`}>Question {index + 1} : {answer}</p>
        ))}

        {stillQuiz
        && <button className="button" onClick={nextQuiz}>Quiz suivant</button>}

      </div>
      )}

      {!isComplete
      && (
      <>
        <div className="quiz-description">
          <h3 className="quiz-title">Coucou toi !</h3>
          <p className="quiz-intro">Es-tu prêt.e à tester tes connaissances ? Je te propose le {firstQuiz.title}, dont tu pourras trouver toutes les réponses sur le site.
            <br />
            Ton score s'affichera à la toute fin, mais ne rafraîchis pas la page en cours de quiz, tu pourrais perdre ta progression !
          </p>

        </div>
        <Card {...question} increaseScore={increaseScore} nextQuestion={nextQuestion} isLastQuestion={isLastQuestion} saveNewAnswer={saveNewAnswer} countAnswers={countAnswers} getResults={getResults} />
      </>

      )}

    </div>
  );
};

Quiz.propTypes = {

  fullQuiz: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
      title: PropType.string.isRequired,
      description: PropType.string,
      nbr_of_questions: PropType.number.isRequired,
      questions: PropType.arrayOf(PropType.shape({
        id: PropType.number.isRequired,
        title: PropType.string.isRequired,
        wiki: PropType.string,
        quiz_handles_question: PropType.object.isRequired,
        propositions: PropType.array.isRequired,
        questionsCONFIRMSpropositions: PropType.array.isRequired,
      })).isRequired,
    }),
  ).isRequired,
  getQuiz: PropType.func.isRequired,
  saveScores: PropType.func.isRequired,
  saveCurrentQuiz: PropType.func.isRequired,
};

export default Quiz;
