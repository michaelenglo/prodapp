import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskUnit from './TaskUnit';


const task = {
  label: "mainTask",
  subtasks: {
    task1ID: {
      label: "task1",
      subtasks: {
        subtask1ID: {
          label: "subtask1",
          subtasks: {},
        },
      },
    },
    task2ID: {
      label: "task1",
      subtasks: {
        subtask2ID: {
          label: "subtask2",
          subtasks: {},
        },
        subtask3ID: {
          label: "subtask3",
          subtasks: {},
        },
      },
    },
  },
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TaskUnit rootKey="maintask" task={task} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efa963',
  },
});
