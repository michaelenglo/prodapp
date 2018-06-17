import React from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import TaskUnit from './TaskUnit';


const task = {
  label: 'Throw a party',
  subtasks: {
    task1ID: {
      label: 'Call friends',
      subtasks: {
        subtask1ID: {
          label: 'Call Lucy',
          subtasks: {},
        },
      },
    },
    task2ID: {
      label: 'Prepare for the party',
      subtasks: {
        subtask2ID: {
          label: 'Buy food and drinks',
          subtasks: {},
        },
        subtask3ID: {
          label: 'Buy cups and plates',
          subtasks: {},
        },
      },
    },
  },
};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state= {};
  }

  render() {
    return (
      <ImageBackground source={require('./assets/dogbackground.png')} resizeMode="repeat" style={styles.woodBackground}>
        <ScrollView style={styles.container}>
          <TaskUnit rootKey="maintask" task={task} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  woodBackground: {
    flex: 1,
  },
});
