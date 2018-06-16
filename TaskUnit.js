import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { material, human, systemWeights } from 'react-native-typography';
import Swipeout from 'react-native-swipeout';

export default class TaskUnit extends React.Component {

  renderTaskUnit(key, task) {

    const isLeafTask = Object.keys(task.subtasks).length !== 0;
    const checkButtonProps = {
      backgroundColor: '#5de851',
      component: <Icon name="check" color="#fff"/>,
      underlayColor: '#fff',
    };

    return (
      <View key={key} style={styles.taskUnit}>
        <Swipeout 
          left={[checkButtonProps]} 
          backgroundColor={'rgba(0,0,0,0)'}
        >
          <Text style={isLeafTask ? material.caption : [human.title2, systemWeights.semibold]}>{task.label}</Text>
          {isLeafTask ? <Divider style={styles.divider} /> : null}
          {isLeafTask ?
            <View style={styles.taskBoard}>
            {
              Object.keys(task.subtasks).map(subtaskKey => {
                return this.renderTaskUnit(subtaskKey, task.subtasks[subtaskKey]);
              })
            }
            </View>
          : null}    
        </Swipeout>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTaskUnit(this.props.rootKey, this.props.task)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    taskBoard: {
      borderRadius: 4,
      backgroundColor: '#4c4c4c',
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
