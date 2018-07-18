import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import { human, systemWeights } from 'react-native-typography';
import { Divider, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable';
import Collapsible from 'react-native-collapsible';
import DoubleTapTouchable from './DoubleTapTouchable';
import AddSubtaskButton from './AddSubtaskButton';
import background from '../assets/blackbackground.png';


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
    borderLeftWidth: 4,
  },
  taskContent: {
    margin: 12,
  },
  divider: {
    marginTop: 10,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#dd433e',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 25,
  },
  taskBoard: {
    borderRadius: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 0,
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
    const { addSubtaskButtonProps } = this.props;

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
            onSingleTap={this.props.onToggleCollapsible}
            onDoubleTap={() => { this.props.onDone(this.props.task.id, this.props.task); }}
          >
            <View style={styles.taskContent}>
              <Text
                style={[human.title2, systemWeights.regular]}
              >
                {this.props.task.label}
              </Text>
              <Collapsible collapsed={!this.props.expanded} duration={500}>
                <Divider style={styles.divider} />
                <ImageBackground source={background} resizeMode="repeat" style={styles.taskBoard}>
                  <AddSubtaskButton
                    onChangeText={addSubtaskButtonProps.onChangeText}
                    value={addSubtaskButtonProps.value}
                    onSubmitEditing={addSubtaskButtonProps.onSubmitEditing}
                    taskName={this.props.task.label}
                  />
                </ImageBackground>
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
  addSubtaskButtonProps: PropTypes.shape({
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
  }),
  onToggleCollapsible: PropTypes.func,
  expanded: PropTypes.bool,
};

LeafTask.defaultProps = {
  expanded: true,
  onToggleCollapsible: () => {},
  addSubtaskButtonProps: {
    onChangeText: () => {},
    value: '',
    onSubmitEditing: () => {},
  },
};

export default LeafTask;
