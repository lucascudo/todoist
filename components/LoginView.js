import React, { Component } from 'react';
import { Form, Item, Content, Text, Input, Body, Button } from 'native-base';
import { connect } from 'react-redux';
import ListView from './ListView';
import { setLoggedIn, setPassword } from '../redux/actions/authActions';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordConfirmation = this.updatePasswordConfirmation.bind(this);
        this.state = {
            password: '',
            passwordConfirmation: '',
        }
    }

    login() {
        if (this.state.password === this.props.password) {
            this.props.reduxLogin();
        } else {
            alert('Senha incorreta');
        }
    }

    register() {
        if (!this.state.password) {
            return alert('Você deve digitar uma senha');
        }
        if (this.state.password === this.state.passwordConfirmation) {
            this.props.reduxSetPassword(this.state.password);
            this.props.reduxLogin();
        } else {
            alert('A senha e a confirmação devem ser as mesmas');
        }
    }

    updatePassword(e) {
        this.setState({ password: e.nativeEvent.text });
    }

    updatePasswordConfirmation(e) {
        this.setState({ passwordConfirmation: e.nativeEvent.text });
    }

    render() {
        return (this.props.loggedIn) ? <ListView></ListView> : (
            <Content>
                <Form style={{ marginBottom: 10 }}>
                    <Item>
                        <Input placeholder="Senha" secureTextEntry={true} onChange={this.updatePassword} />
                    </Item>
                    {(!this.props.password) && (
                        <Item>
                            <Input placeholder="Confirmação da senha" secureTextEntry={true} onChange={this.updatePasswordConfirmation} />
                        </Item>
                    )}
                </Form>
                <Body>
                    <Button primary onPress={(this.props.password) ? this.login : this.register}>
                        <Text> {(this.props.password) ? 'Login' : 'Cadastrar'} </Text>
                    </Button>
                </Body>
            </Content>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        loggedIn: state.authReducer.loggedIn,
        password: state.authReducer.password,
    };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        // Set List
        reduxLogin: () => dispatch(setLoggedIn(true)),
        reduxSetPassword: (password) => dispatch(setPassword(password)),
    };
};
// Exports
module.exports = connect(mapStateToProps, mapDispatchToProps)(LoginView);