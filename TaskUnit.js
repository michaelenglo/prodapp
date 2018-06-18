import React from 'react';
import { Alert, StyleSheet, Text, ImageBackground, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { material, human, systemWeights } from 'react-native-typography';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';

import background from './assets/blackbackground.png';

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
    padding: 5,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  taskUnitDone: {
    borderColor: '#5de851',
    borderLeftWidth: 7,
  },
  taskBoard: {
    borderRadius: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 0,
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

    this.handleDoneButtonPress = this.handleDoneButtonPress.bind(this);
  }

  handleDoneButtonPress(key, task) {
    if (Object.keys(task.subtasks).length !== 0) {
      Alert.alert(
        'Resolve Subtasks',
        'All subtasks under this task will be marked as done. Continue?',
        [
          { text: 'No' },
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

  renderTaskUnit(key, task) {
    const isLeafTask = Object.keys(task.subtasks).length !== 0;
    const checkButtonProps = {
      backgroundColor: '#5de851',
      component: <Icon name="check" color="#fff" />,
      underlayColor: '#fff',
      onPress: () => {
        this.handleDoneButtonPress(key, task);
      },
    };

    return (
      <View key={key} style={[styles.taskUnit, task.done ? styles.taskUnitDone : []]}>
        <Swipeout
          left={[checkButtonProps]}
          backgroundColor="rgba(0,0,0,0)"
          autoClose
        >
          <Text
            style={isLeafTask ? [material.caption, systemWeights.semibold]
            : [human.title2, systemWeights.regular]}
          >
            {task.label}
          </Text>
          {isLeafTask ? <Divider style={styles.divider} /> : null}
          {isLeafTask ?
            <ImageBackground source={background} resizeMode="repeat" style={styles.taskBoard}>
              {
              Object.keys(task.subtasks).map(subtaskKey => this.renderTaskUnit(
                subtaskKey,
                task.subtasks[subtaskKey],
              ))
            }
            </ImageBackground>
          : null}
        </Swipeout>
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
};

TaskUnit.defaultProps = {
  onDone: () => {},
};

export default TaskUnit;
