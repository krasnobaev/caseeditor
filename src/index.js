import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { VisibleCase, VisibleCaseList, VisibleControlPanel } from './containers/MainContainer';

import {
  render,
  Window,
  App,
  Box,
  Button,
  Picker,
  Text,
  TextInput,
} from 'proton-native';

import { configureStore } from './ducks/store.js'

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <App>
          <Window title="test cases editor" size={{w: 300, h: 300}} menuBar={false}>
            <Box>
              <VisibleControlPanel />
              <VisibleCase />
            </Box>
          </Window>
        </App>
      </Provider>
    );
  }
}

render(<Main />);
