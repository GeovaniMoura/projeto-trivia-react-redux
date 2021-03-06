import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import he from 'he';

class Answers extends Component {
  render() {
    const { alternatives, correct,
      showAnswersResults, borderCorrect, borderWrong, bttDisabled } = this.props;
    return (
      <div
        className="answers-container"
        data-testid="answer-options"
      >
        { alternatives.map((each, index) => {
          if (each === correct) {
            return (
              <button
                disabled={ bttDisabled }
                data-testid="correct-answer"
                type="button"
                className={ borderCorrect }
                key={ index }
                onClick={ () => showAnswersResults(each) }
              >
                { he.decode(each) }
              </button>
            );
          }
          return (
            <button
              disabled={ bttDisabled }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              className={ borderWrong }
              key={ index }
              onClick={ () => showAnswersResults(each) }
            >
              { he.decode(each) }
            </button>
          );
        })}
      </div>
    );
  }
}

Answers.propTypes = {
  alternatives: PropTypes.string,
  correct: PropTypes.string,
  showAnswersResults: PropTypes.func,
  borderCorrect: PropTypes.string,
  borderWrong: PropTypes.string,
}.isRequired;

export default Answers;
