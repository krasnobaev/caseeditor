import React, { Component } from 'react';
import {
  Box,
  Button,
  Picker,
  Text,
  TextInput,
} from 'proton-native';

export class Case extends Component {
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
