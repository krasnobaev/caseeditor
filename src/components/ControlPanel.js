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
      <Box stretchy={false} vertical={false}>
        <TextInput stretchy={true} multiline={false} />
        <Button stretchy={false} onClick={this.props.onFileLoad}>Load</Button>
        <Button stretchy={false} onClick={this.props.onFileSave}>Save</Button>
      </Box>
    )
  }
}
