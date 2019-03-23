import React, { Component } from 'react';
import {
  Box,
  Button,
  Picker,
  Text,
  TextInput,
} from 'proton-native';

export class Case extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // prevent rerender on each input
    if (this.props.state.curcase === nextProps.state.curcase) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <Box vertical={false}>
        <Box>
          <Text stretchy={false}>IN</Text>
          <TextInput multiline={true} onChange={this.props.onCaseEdit.bind(this, 'in')}>
            {this.props.curcasein}
          </TextInput>
        </Box>
        <Box>
          <Text stretchy={false}>OUT</Text>
          <TextInput multiline={true} onChange={this.props.onCaseEdit.bind(this, 'out')}>
            {this.props.curcaseout}
          </TextInput>
        </Box>
      </Box>
    )
  }
}
