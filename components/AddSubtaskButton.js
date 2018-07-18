import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Collapsible from 'react-native-collapsible';


const styles = StyleSheet.create({
  container: {
    width: '98%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fcfcfc',
    marginTop: 5,
    backgroundColor: '#ededed',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  textInputStyle: {
    padding: 0,
    height: 25,
    fontSize: 22,
    margin: 12,
  },
});

class AddSubtaskButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Collapsible collapsed={!this.props.expanded}>
        <View style={styles.container}>
          <TextInput
            placeholder={`Add Subtask to ${this.props.taskName}`}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.textInputStyle}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.onSubmitEditing}
            enablesReturnKeyAutomatically
          />
        </View>
      </Collapsible>
    );
  }
}


AddSubtaskButton.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  expanded: PropTypes.bool,
  taskName: PropTypes.string,
};

AddSubtaskButton.defaultProps = {
  expanded: true,
  value: '',
  taskName: '',
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

export default AddSubtaskButton;
