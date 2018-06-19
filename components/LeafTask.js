import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { human, systemWeights } from 'react-native-typography';
import PropTypes from 'prop-types';
import DoubleTapTouchable from './DoubleTapTouchable';


const styles = StyleSheet.create({
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
    borderLeftWidth: 7,
  },
  taskContent: {
    margin: 12,
  },
});

const LeafTask = props => (
  <View style={[styles.taskUnit, props.task.done ? styles.taskUnitDone : []]}>
    <DoubleTapTouchable
      onSingleTap={() => { Alert.alert('hahahaha'); }}
      onDoubleTap={() => { props.onDone(props.task.id, props.task); }}
    >
      <View style={styles.taskContent}>
        <Text
          style={[human.title2, systemWeights.regular]}
        >
          {props.task.label}
        </Text>
      </View>
    </DoubleTapTouchable>
  </View>
);


LeafTask.propTypes = {
  task: PropTypes.shape({
    done: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onDone: PropTypes.func.isRequired,
};

LeafTask.defaultProps = {
};

export default LeafTask;
