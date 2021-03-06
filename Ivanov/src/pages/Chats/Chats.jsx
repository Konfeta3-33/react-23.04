import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Messages from '../../components/Messages';
import { setChats, updateChats } from '../../actions/chatsActions';
import Button from '@material-ui/core/Button';
import styles from './Chats.css'

class Chats extends Component {
    state = {
        chats: {
            1: {
                title: 'chat_1',
                messages: [
                    {
                        text: 'Hi from first chat',
                        author: 'Bot'
                    },
                ]
            },
            2: {
                title: 'chat_2',
                messages: [
                    {
                        text: 'Hi from second chat',
                        author: 'Bot'
                    },
                ]
            },
            3: {
                title: 'chat_3',
                messages: [
                    {
                        text: 'Hi from third chat',
                        author: 'Bot'
                    },
                ]
            }
        },
        messages: [ { text: 'Hello', author: 'Bot'}],
    };    

    timer;

    componentDidUpdate(prevProps, prevState) {
        const {
            match: { params }
        } = this.props;
        const { chatId } = params;
        const { chats } = this.props;
        const messages = chats[chatId-1].messages;
        
        clearTimeout(this.timer);
        if(prevState.chats[chatId].messages.length !== messages.length) {
            if (messages[messages.length - 1].author !== "Bot") {
                    this.timer = setTimeout(() => {
                        this.addNewMessage({ text: "привет, я Бот", author: "Bot" });
                        }, 1000);
                
            }
        }
    }
    
    addNewMessage = ({text, author}) => {
        const {
            match: { params }
        } = this.props;
        const { chatId } = params;
        const { chats } = this.props;
        const messages = chats[chatId-1].messages;
        const toAdd = { text:text,author: author,chatId: chatId-1 };
        console.log(toAdd);
        this.props.updateChats(toAdd);
    };

    onChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
      };
    
    onSubmit = (e) => {
        e.preventDefault();
        this.sendMessage();
    };

    sendMessage = () => {
        const {text} = this.state;
        this.addNewMessage({text, author:'Nick'});
        this.setState({'text':''});
    }

    onKeyUP = (event) => {
        if(event.keyCode === 13) {
            this.sendMessage();
        }
    }

    get messages() {
        const { chats } = this.props;
        const {
          match: { params },
        } = this.props;
        const { chatId } = params;
        return chats[chatId-1].messages;
    }
    
    render() {
        const { text } = this.state;
        // const { messages } = this.state;
        
        return (
            <div className={styles.container}>
                
                <Messages messages={this.messages} />
                <form className={styles.form} onSubmit={this.onSubmit} onKeyUp={this.onKeyUP}>
                    <textarea
                        className={styles.messageField}
                        name="text" 
                        onChange={this.onChange}
                        value={text}
                    />
                    <Button
                        className={styles.button} 
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Add message
                    </Button>
                </form>
            </div>
            
        );
    }
}

// MessageField.propTypes = {
//     addNewMessage: PropTypes.func.isRequired,
// }

const mapStateToProps = store => ({
    chats: store.chats,
});

const mapDispatchToProps = {
    updateChats,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chats);