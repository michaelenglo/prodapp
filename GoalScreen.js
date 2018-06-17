import React from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import TaskUnit from './TaskUnit';
import background from './assets/dogbackground.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  woodBackground: {
    flex: 1,
  },
});

class GoalScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Recursive helper function that transform normalized
  // tasks into nested task.
  transformLinearTasksToNested(linearTask, rootTaskKey) {
    const rootTask = linearTask[rootTaskKey];
    if (rootTask && rootTask.subtasks) {
      const subtaskMap = {};
      rootTask.subtasks.forEach((subtaskKey) => {
        subtaskMap[subtaskKey] = this.transformLinearTasksToNested(linearTask, subtaskKey);
      });
      rootTask.subtasks = subtaskMap;
    }
    return rootTask;
  }

  render() {
    return (
      <ImageBackground source={background} resizeMode="repeat" style={styles.woodBackground}>
        <ScrollView style={styles.container}>
          <TaskUnit rootKey="maintask" task={this.transformLinearTasksToNested(this.props.tasks, 'maintask')} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks,
});

export default connect(mapStateToProps)(GoalScreen);
