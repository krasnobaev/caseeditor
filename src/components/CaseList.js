import React, { Component } from 'react';
import {
  Box,
  Button,
  Picker,
  Text,
  TextInput,
} from 'proton-native';

export class CaseList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Picker onSelect={this.props.onCaseSelect} stretchy={false}>
        <Picker.Item>Case 1</Picker.Item>
        <Picker.Item>Case 2</Picker.Item>
        <Picker.Item>Case 3</Picker.Item>
      </Picker>
    )
  }
}
