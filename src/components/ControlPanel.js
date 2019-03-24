import React, { Component } from 'react';
import {
  Box,
  Button,
  Picker,
  Text,
  TextInput,
} from 'proton-native';

export class ControlPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box stretchy={false}>
        <Box stretchy={false} vertical={false}>
          <TextInput stretchy={true} multiline={false}>{this.props.curfile}</TextInput>
          <Button stretchy={false} onClick={this.props.onFileLoad}>Load</Button>
          <Button stretchy={false} onClick={this.props.onFileSave}>Save</Button>
        </Box>
        <Picker
            selected={this.props.state.curcase}
            onSelect={this.props.onCaseSelect}
            stretchy={false}
        >
          {this.props.cases.map((oCase, i) => {
            return (
              <Picker.Item key={i}>{
                `case #${i+1}` + (oCase.description ? `: ${oCase.description}` : '')
              }</Picker.Item>
            );
          })}
        </Picker>
      </Box>
    )
  }
}
