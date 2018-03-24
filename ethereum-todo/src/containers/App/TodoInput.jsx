import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.input`
  box-sizing: border-box;
  padding: 10px 0;
  background: transparent;
  border: none;
  width: 100%;
  padding-right: 80px;
  font-size: 16px;
  padding: 0px;

  :focus {
    outline: 0;
  }
`;

class TodoInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.submitOnClick = this.submitOnClick.bind(this);
    this.textOnChange = this.textOnChange.bind(this);
  }

  textOnChange(event) {
    const text = event.target.value;
    this.setState({ text });
  }

  submitOnClick(event) {
    event.preventDefault();

    const { text } = this.state;
    this.props.submitOnClick(text);
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    return (
      <form onSubmit={this.submitOnClick} >
        <Input
          type="text"
          value={text}
          onChange={this.textOnChange}
          placeholder="Type to add new tasks"
        />
      </form>
    );
  }
};

TodoInput.propTypes = {
  submitOnClick: PropTypes.func,
};

TodoInput.defaultProps = {
  submitOnClick: () => {},
};

export default TodoInput;
