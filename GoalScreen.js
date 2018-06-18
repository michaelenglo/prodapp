import React from 'react';
import PropTypes from 'prop-types';
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

    this.handleDone = this.handleDone.bind(this);
  }

  handleDone(taskKey, task) {
    this.props.markTaskAsDone(taskKey);
  }

  // Recursive helper function that transform normalized
  // tasks into nested task.
  transformLinearTasksToNested(linearTask, rootTaskKey) {
    const rootTask = { ...linearTask[rootTaskKey] };
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
    const nestedTask = this.transformLinearTasksToNested(this.props.tasks, 'maintask');
    return (
      <ImageBackground source={background} resizeMode="repeat" style={styles.woodBackground}>
        <ScrollView style={styles.container}>
          <TaskUnit onDone={this.handleDone} rootKey="maintask" task={nestedTask} />
        </ScrollView>
      </ImageBackground>
    );
  }
}

GoalScreen.propTypes = {
  tasks: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    subtasks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch => ({
  markTaskAsDone: taskKey => dispatch({
    type: 'MARK_TASK_AS_DONE',
    taskKey,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalScreen);
