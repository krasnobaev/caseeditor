import React, { Component } from 'react';

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

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="test cases editor" size={{w: 300, h: 300}} menuBar={false}>
          <Box>
            <Box stretchy={false} vertical={false}>
              <TextInput stretchy={true} multiline={false} />
              <Button stretchy={false}>Load</Button>
              <Button stretchy={false}>Save</Button>
            </Box>
            <Picker stretchy={false}>
              <Picker.Item>Option 1</Picker.Item>
              <Picker.Item>Option 2</Picker.Item>
              <Picker.Item>Option 3</Picker.Item>
            </Picker>
            <Box vertical={false}>
              <Box>
                <Text stretchy={false}>IN</Text>
                <TextInput />
              </Box>
              <Box>
                <Text stretchy={false}>OUT</Text>
                <TextInput />
              </Box>
            </Box>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
