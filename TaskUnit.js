import React from 'react';
import { Alert, StyleSheet, Text, ImageBackground, View, TouchableWithoutFeedback } from 'react-native';
import { Divider } from 'react-native-elements';
import { material, systemWeights } from 'react-native-typography';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';
import LeafTask from './components/LeafTask';

import background from './assets/blackbackground.png';
import AddSubtaskButton from './components/AddSubtaskButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  taskUnit: {
    width: '98%',
    borderRadius: 4,
    marginTop: 5,
    backgroundColor: 'white',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  taskUnitDone: {
    borderColor: '#5de851',
    borderLeftWidth: 4,
  },
  taskBoard: {
    borderRadius: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 0,
  },
  taskContent: {
    margin: 5,
  },
  divider: {
    marginTop: 1,
    marginBottom: 8,
  },
  disabledTaskColor: {
    backgroundColor: '#dddddd',
  },
});

class TaskUnit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: null,
      addSubtaskButtonValue: '',
    };

    this.handleDoneButtonPress = this.handleDoneButtonPress.bind(this);
    this.handleExpandCollabsible = this.handleExpandCollabsible.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleAddSubtaskButtonChange = this.handleAddSubtaskButtonChange.bind(this);
    this.handleAddSubtaskButtonSubmit = this.handleAddSubtaskButtonSubmit.bind(this);
  }

  handleDeleteTask(id) {
    this.props.onDelete(id);
  }

  handleDoneButtonPress(key, task) {
    if (Object.keys(task.subtasks).length !== 0) {
      Alert.alert(
        'Resolve Subtasks',
        'All subtasks under this task will be marked as done. Continue?',
        [
          { text: 'No', onPress: () => { this.forceUpdate(); } },
          {
            text: 'Yes',
            onPress: () => {
              this.props.onDone(key, task);
            },
            style: 'cancel',
          },
        ],
      );
    } else {
      this.props.onDone(key, task);
    }
  }

  handleExpandCollabsible(key) {
    const toBeExpanded = this.state.expanded === key ? null : key;
    this.setState({
      expanded: toBeExpanded,
      addSubtaskButtonValue: '',
    });
  }


  handleAddSubtaskButtonChange(addSubtaskButtonValue) {
    this.setState({
      addSubtaskButtonValue,
    });
  }

  handleAddSubtaskButtonSubmit(taskKey) {
    this.props.onAdd(taskKey, this.state.addSubtaskButtonValue);
    this.setState({
      addSubtaskButtonValue: '',
    });
  }

  renderTaskUnit(key, task) {
    const isLeafTask = Object.keys(task.subtasks).length === 0;

    if (isLeafTask) {
      return (
        <LeafTask
          key={key}
          task={task}
          onDone={this.handleDoneButtonPress}
          onDelete={this.handleDeleteTask}
          onSwipe={this.props.onSwipe}
          expanded={this.state.expanded === key}
          onToggleCollapsible={() => this.handleExpandCollabsible(key)}
          addSubtaskButtonProps={{
            onChangeText: this.handleAddSubtaskButtonChange,
            value: this.state.addSubtaskButtonValue,
            onSubmitEditing: () => this.handleAddSubtaskButtonSubmit(key),
          }}
        />);
    }

    return (
      <View key={key} style={[styles.taskUnit, task.done ? styles.taskUnitDone : []]}>
        <View style={styles.taskContent}>
          <TouchableWithoutFeedback onPress={() => this.handleExpandCollabsible(key)}>
            <View>
              <Text
                style={[material.caption, systemWeights.semibold]}
              >
                {task.label}
              </Text>
              <Divider style={styles.divider} />
            </View>
          </TouchableWithoutFeedback>
          <Collapsible collapsed={this.state.expanded !== key}>
            <Text
              style={material.caption}
            >
              Subtasks:
            </Text>
          </Collapsible>
          <ImageBackground source={background} resizeMode="repeat" style={styles.taskBoard}>
            {
              Object.keys(task.subtasks).map(subtaskKey => this.renderTaskUnit(
                subtaskKey,
                task.subtasks[subtaskKey],
              ))
            }
            <AddSubtaskButton
              expanded={this.state.expanded === key}
              onChangeText={this.handleAddSubtaskButtonChange}
              value={this.state.addSubtaskButtonValue}
              onSubmitEditing={() => this.handleAddSubtaskButtonSubmit(key)}
              taskName={task.label}
            />
          </ImageBackground>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTaskUnit(this.props.rootKey, this.props.task)}
      </View>
    );
  }
}

TaskUnit.propTypes = {
  onDone: PropTypes.func,
  rootKey: PropTypes.string.isRequired,
  task: PropTypes.shape({}).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSwipe: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

TaskUnit.defaultProps = {
  onDone: () => {},
};

export default TaskUnit;
