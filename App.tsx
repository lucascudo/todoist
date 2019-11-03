import React from 'react';
import { AppLoading } from 'expo';
import { Container, Header, Left, Button, Icon, Title, Body, Right } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import LoginView from './components/LoginView';


// Imports: Redux Persist Persister
import { store, persistor } from './redux/store/store';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <PersistGate loading={!this.state.isReady} persistor={persistor}>
          <Container>
            <Header>
                <Left>
                    <Button transparent>
                    <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>Todoist</Title>
                </Body>
                <Right />
            </Header>
            <LoginView></LoginView>
          </Container>
        </PersistGate>
      </Provider>
    );
  }
}