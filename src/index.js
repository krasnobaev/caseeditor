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

class Case extends Component {
  render() {
    return (
      <Box vertical={false}>
        <Box>
          <Text stretchy={false}>IN</Text>
          <TextInput>{this.props.case}</TextInput>
        </Box>
        <Box>
          <Text stretchy={false}>OUT</Text>
          <TextInput>{this.props.result}</TextInput>
        </Box>
      </Box>
    )
  }
}

class CaseList extends Component {
  constructor(props) {
    super(props);
    this.onCaseSelect = this.onCaseSelect.bind(this);
  }

  onCaseSelect() {
    console.log('case selected');
  }

  render() {
    return (
      <Picker onSelect={this.onCaseSelect} stretchy={false}>
        <Picker.Item>Case 1</Picker.Item>
        <Picker.Item>Case 2</Picker.Item>
        <Picker.Item>Case 3</Picker.Item>
      </Picker>
    )
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.onFileLoad   = this.onFileLoad.bind(this);
    this.onFileSave   = this.onFileSave.bind(this);
  }

  onFileLoad() {
    console.log('file loaded');

  }
  onFileSave() {
    console.log('file saved');
  }

  render() {
    return (
      <App>
        <Window title="test cases editor" size={{w: 300, h: 300}} menuBar={false}>
          <Box>
            <Box stretchy={false} vertical={false}>
              <TextInput stretchy={true} multiline={false} />
              <Button stretchy={false} onClick={this.onFileoad}>Load</Button>
              <Button stretchy={false} onClick={this.onFileSave}>Save</Button>
            </Box>
            <CaseList />
            <Case case={'1\n2\n3'} result={'3'}/>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Main />);
