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
    this.state = {
      isSwiping: false,
    };

    this.handleDone = this.handleDone.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleTaskUnitSwipe = this.handleTaskUnitSwipe.bind(this);
  }

  handleTaskUnitSwipe(isSwiping) {
    this.setState({ isSwiping });
  }

  handleDone(taskKey) {
    this.props.markTaskAsDone(taskKey);
  }

  handleDeleteTask(taskKey) {
    this.props.deleteTask(taskKey);
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
        <ScrollView style={styles.container} scrollEnabled={!this.state.isSwiping}>
          <TaskUnit onDone={this.handleDone} rootKey="maintask" task={nestedTask} onDelete={this.handleDeleteTask} onSwipe={this.handleTaskUnitSwipe}/>
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
  markTaskAsDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    enableHorizontalScroll: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
  markTaskAsDone: taskKey => dispatch({
    type: 'MARK_TASK_AS_DONE',
    taskKey,
  }),
  createSubtask: (taskKey, label) => dispatch({
    type: 'CREATE_SUBTASK',
    taskKey,
    label,
  }),
  deleteTask: taskKey => dispatch({
    type: 'DELETE_TASK',
    taskKey,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalScreen);
