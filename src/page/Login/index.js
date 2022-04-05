import React from 'react';
import * as EmailValidator from 'email-validator';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getToken from '../../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputPlayerName: '',
      inputGravatarEmail: '',
      bttDisabled: true,
    };
  }

  inputChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.verifyButton());
  }

  verifyButton = () => {
    const { inputPlayerName, inputGravatarEmail } = this.state;
    const minCharacters = 6;
    const validate = ((inputPlayerName.length >= minCharacters)
      && EmailValidator.validate(inputGravatarEmail));
    if (validate) this.setState({ bttDisabled: false });
  }

  startGame = () => {
    const { history, fetchAPI } = this.props;
    history.push('/gamescreen');
    fetchAPI();
  }

  render() {
    const { bttDisabled, inputPlayerName, inputGravatarEmail } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            <input
              id="input-player-name"
              name="inputPlayerName"
              data-testid="input-player-name"
              onChange={ this.inputChange }
              value={ inputPlayerName }
              type="text"
              placeholder="Digite seu nickname"
            />
          </label>
          <label htmlFor="input-gravatar-email">
            <input
              id="input-gravatar-email"
              name="inputGravatarEmail"
              onChange={ this.inputChange }
              value={ inputGravatarEmail }
              data-testid="input-gravatar-email"
              type="text"
              placeholder="Digite seu email"
            />
          </label>
          <button
            disabled={ bttDisabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.startGame }
          >
            Play
          </button>
        </form>
        <div>
          <Link to="/configuracoes">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(getToken()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
