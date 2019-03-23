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
        {this.props.state.cases.map((oCase, i) => {
          return (
            <Picker.Item key={i}>{
              `case #${i+1}` + (oCase.description ? `: ${oCase.description}`:'')
            }</Picker.Item>
          );
        })}
      </Picker>
    )
  }
}
