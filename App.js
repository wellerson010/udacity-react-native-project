import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import AddEntry from './component/AddEntry';

export default class App extends Component {
  render() {
    return (
      <View >
        <AddEntry />
      </View>
    );
  }
}