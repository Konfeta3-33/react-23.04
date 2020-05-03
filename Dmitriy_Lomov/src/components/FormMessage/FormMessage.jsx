import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';
import styles from './index.css';

class FormMessage extends Component {
  state = {
    text: '',
    author: '',
  };

  onChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { addNewMessage } = this.props;

    addNewMessage(this.state);
  };

  sendMessage = () => {
    const { addNewMessage } = this.props;
    const { text, author } = this.state;

    addNewMessage({ author, text });
    this.setState({
      text: '',
    });
  };

  onKeyUp = e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      this.sendMessage();
    }
  };

  render() {
    const { text, author } = this.state;

    return (
      <form className={styles.container} onSubmit={this.onSubmit}>
        <TextField
          id="standard-basic"
          label="Автор"
          name="author"
          onChange={this.onChange}
          value={author}
        />
        <TextField
          id="standard-multiline-flexible"
          label="Текст сообщения"
          name="text"
          multiline
          rowsMax={4}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          value={text}
        />
        <Button type="submit">Add message</Button>
      </form>
    );
  }
}

FormMessage.propTypes = {
  addNewMessage: PropTypes.func.isRequired,
};

export default FormMessage;
