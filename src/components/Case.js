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
          <TextInput onChange={this.props.onCaseEdit.bind(this, 'in')}>
            {this.props.curcasein}
          </TextInput>
        </Box>
        <Box>
          <Text stretchy={false}>OUT</Text>
          <TextInput onChange={this.props.onCaseEdit.bind(this, 'out')}>
            {this.props.curcaseout}
          </TextInput>
        </Box>
      </Box>
    )
  }
}
