/* eslint-disable max-len */
// == React Import
import React, { useState } from 'react';

// == Import css
import './card.scss';

import PropType from 'prop-types';

import Proposition from './Proposition/Proposition';

// == Quiz in homepage right border on Spoutnik click
const Card = ({
  title, questionsCONFIRMSpropositions, propositions, wiki, description, increaseScore, nextQuestion, isLastQuestion, saveNewAnswer, countAnswers, getResults,
}) => {
  // Local states
  // Indicates if one question is answered or not
  const [estViteRepondue, setEstViteRepondue] = useState(false);
  // Array of saved answers passed to Proposition as a prop
  const [savedAnswers, setSavedAnswers] = useState([]);

  // Returns an array of all the correct answers ids
  const correctAnswers = questionsCONFIRMSpropositions.map((answer) => answer.id);

  // Function disabling possibility to answer once "valider" (confirm) is clicked

  const stopAnswering = () => {
    setEstViteRepondue(true);
    // Checks if the ids of chosen answers are equivalent to the array of correct answers ids
    const isCorrect = correctAnswers.length === savedAnswers.length && correctAnswers.every((correctAnswer) => savedAnswers.find((savedAnswer) => savedAnswer === correctAnswer));

    // Those conditions add a "correct" or "incorrect" string to an array used to display final results at the end of quiz
    // It also increments a score counter in Quiz via a callback function
    if (isCorrect) {
      increaseScore();
      countAnswers('Correct');
    }
    else {
      countAnswers('Incorrect');
    }
    // Adds the text of the answers chosen by the user to a state array in Quiz, could be used in profile to display all results (and not just the score and correct/incorrect for each question)
    saveNewAnswer(savedAnswers);
  };

  // Those two functions add ths ids of the answers chosen by the user to be able to an array savedAsnwers compare them to the correct answers ids
  const addSavedAnswer = (id) => {
    setSavedAnswers([...savedAnswers, id]);
  };
  const removedSavedAnswer = (id) => {
    const newSavedAnswers = savedAnswers.filter((answer) => answer !== id);
    setSavedAnswers(newSavedAnswers);
  };

  // Allows to move on to the next question, called when clicking on "Suivant" (next)

  const nextQuestionFirst = () => {
    setEstViteRepondue(false);
    setSavedAnswers([]);
    nextQuestion();
  };

  return (
    <div className="cardquiz">
      <p className="cardquiz-title">{title}</p>
      <p className="cardquiz-wiki">{wiki}</p>
      <p className="cardquiz-nbanswers">{questionsCONFIRMSpropositions.length} réponse(s) possible(s)</p>
      <form className="cardquiz-form">
        {
    propositions.map((proposition) => (
      <Proposition
        key={`prop-${proposition.id}`}
        proposition={proposition}
        description={description}
        rightAnswerIds={correctAnswers}
        estViteRepondue={estViteRepondue}
        addSavedAnswer={addSavedAnswer}
        removedSavedAnswer={removedSavedAnswer}
      />

    ))

  }
      </form>

      {!estViteRepondue && <button className="button" type="button" onClick={stopAnswering}>Valider</button>}
      {estViteRepondue && !isLastQuestion && <button className="button" type="button" onClick={nextQuestionFirst}>Suivant</button>}

      {isLastQuestion && estViteRepondue
          && <button className="button" type="button" onClick={getResults}>Voir les résultats</button>}

    </div>
  );
};

Card.propTypes = {

  title: PropType.string.isRequired,
  questionsCONFIRMSpropositions: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
      description: PropType.string.isRequired,
      proposition_confirms_question: PropType.number.isRequired,
    }),
  ).isRequired,
  propositions: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
      description: PropType.string.isRequired,
      question_has_proposition: PropType.objectOf(
        PropType.shape({
          id_question: PropType.number.isRequired,
          id_proposition: PropType.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  wiki: PropType.string,
  description: PropType.string.isRequired,
  increaseScore: PropType.func.isRequired,
  nextQuestion: PropType.func.isRequired,
  isLastQuestion: PropType.bool.isRequired,
  saveNewAnswer: PropType.func.isRequired,
  countAnswers: PropType.func.isRequired,
  getResults: PropType.func.isRequired,
};

export default Card;
