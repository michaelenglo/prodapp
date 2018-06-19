import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { human, systemWeights } from 'react-native-typography';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';

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

const LeafTask = (props) => {
  const checkButtonProps = {
    backgroundColor: '#5de851',
    component: <Icon name="check" color="#fff" />,
    underlayColor: '#fff',
    onPress: () => {
      props.onDone(props.task.id, props.task);
    },
  };

  return (
    <View style={[styles.taskUnit, props.task.done ? styles.taskUnitDone : []]}>
      <Swipeout
        left={[checkButtonProps]}
        backgroundColor="rgba(0,0,0,0)"
        autoClose
      >
        <View style={styles.taskContent}>
          <Text
            style={[human.title2, systemWeights.regular]}
          >
            {props.task.label}
          </Text>
        </View>
      </Swipeout>
    </View>
  );
};


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
