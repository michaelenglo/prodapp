import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskUnit from './TaskUnit';


const task = {
  label: "Throw a party",
  subtasks: {
    task1ID: {
      label: "Call friends",
      subtasks: {
        subtask1ID: {
          label: "Call Lucy",
          subtasks: {},
        },
      },
    },
    task2ID: {
      label: "Prepare for the party",
      subtasks: {
        subtask2ID: {
          label: "Buy food and drinks",
          subtasks: {},
        },
        subtask3ID: {
          label: "Buy cups and plates",
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
