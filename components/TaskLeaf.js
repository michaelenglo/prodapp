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
    margin: 5,
  },
});

const TaskUnit = (props) => {
  const checkButtonProps = {
    backgroundColor: '#5de851',
    component: <Icon name="check" color="#fff" />,
    underlayColor: '#fff',
    onPress: () => {
      props.onDone(props.key);
    },
  };

  return (
    <View style={[styles.taskUnit, props.done ? styles.taskUnitDone : []]}>
      <Swipeout
        left={[checkButtonProps]}
        backgroundColor="rgba(0,0,0,0)"
        close
      >
        <View style={styles.taskContent}>
          <Text
            style={[human.title2, systemWeights.regular]}
          >
            {props.label}
          </Text>
        </View>
      </Swipeout>
    </View>
  );
};


TaskUnit.propTypes = {
  done: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

TaskUnit.defaultProps = {
};

export default TaskUnit;
