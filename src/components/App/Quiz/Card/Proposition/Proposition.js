import React, { useState } from 'react';

import PropType from 'prop-types';

import './proposition.scss';

const Proposition = ({
  proposition, description, rightAnswerIds, estViteRepondue, addSavedAnswer,
  removedSavedAnswer,
}) => {
  const [is, setIs] = useState('');

  // This function uses two callbacks functions inherited from the parent component (add and removedSavedAnswer) to save answers ids in an state array savedAnswers located in the card component 

  // Also sets the state 'is' to '', 'true' or 'false' to change the class (and color) according to a right or wrong answer 
  
  const saveAnswers = (event) => {
    const answerId = parseInt(event.target.id, 10);
    if (is !== '') {
      setIs('');
      removedSavedAnswer(answerId);
    }
    else if (rightAnswerIds.find((rightAnswerId) => answerId === rightAnswerId)) {
      setIs('true');
      addSavedAnswer(answerId);
    }
    else {
      setIs('false');
      addSavedAnswer(answerId);
    }
  };

  return (
    <div className={`card-answer ${estViteRepondue ? is : ''}`}>
      <input
        className="card-input"
        type="checkbox"
        key={`prop-${proposition.id}`}
        id={proposition.id}
        name={description}
        onChange={saveAnswers}
        value={proposition.description}
        disabled={estViteRepondue}
      />
      <label htmlFor={proposition.id}>{proposition.description} </label>
    </div>
  );
};

Proposition.propTypes = {
  proposition: PropType.arrayOf(
    PropType.shape({
      id: PropType.number.isRequired,
      description: PropType.string.isRequired,
      question_has_proposition: PropType.arrayOf(
        PropType.shape({
          id_question: PropType.number.isRequired,
          id_proposition: PropType.number.isRequired,
        }),
      ),
    }),
  ).isRequired,
  description: PropType.string.isRequired,
  rightAnswerIds: PropType.array.isRequired,
  estViteRepondue: PropType.bool.isRequired,
  addSavedAnswer: PropType.func.isRequired,
  removedSavedAnswer: PropType.func.isRequired,

};

export default Proposition;
