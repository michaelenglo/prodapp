import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { human, systemWeights } from 'react-native-typography';
import { Divider, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable';
import Collapsible from 'react-native-collapsible';
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
    overflow: 'hidden',
  },
  taskUnitDone: {
    borderColor: '#5de851',
    borderLeftWidth: 7,
  },
  taskContent: {
    margin: 12,
  },
  divider: {
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#dd433e',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 25,
  },
});

class LeafTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.handleToggleColapsible = this.handleToggleColapsible.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  handleDeleteTask() {
    this.props.onDelete(this.props.task.id);
  }

  handleToggleColapsible() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const rightButtons = [
      <TouchableHighlight style={styles.deleteButton} onPress={() => { this.handleDeleteTask(); }}>
        <Icon name="delete" color="#fff" />
      </TouchableHighlight>,
    ];

    return (
      <View style={[styles.taskUnit, this.props.task.done ? styles.taskUnitDone : []]}>
        <Swipeable
          rightButtons={rightButtons}
          onSwipeStart={() => this.props.onSwipe(true)}
          onSwipeRelease={() => this.props.onSwipe(false)}
        >
          <DoubleTapTouchable
            onSingleTap={this.handleToggleColapsible}
            onDoubleTap={() => { this.props.onDone(this.props.task.id, this.props.task); }}
          >
            <View style={styles.taskContent}>
              <Text
                style={[human.title2, systemWeights.regular]}
              >
                {this.props.task.label}
              </Text>
              <Collapsible collapsed={!this.state.expanded} duration={500}>
                <Divider style={styles.divider} />
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
                <Text>Hahahaha</Text>
              </Collapsible>
            </View>
          </DoubleTapTouchable>
        </Swipeable>
      </View>
    );
  }
}


LeafTask.propTypes = {
  task: PropTypes.shape({
    done: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSwipe: PropTypes.func.isRequired,
};

LeafTask.defaultProps = {
};

export default LeafTask;
