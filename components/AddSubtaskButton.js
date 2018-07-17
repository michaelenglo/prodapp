import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    margin: 5,
    padding: 5,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOpacity: 0.8,
  },
  textInputStyle: {
    padding: 0,
    height: 30,
    fontSize: 22,
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
      <View style={styles.container}>
        <TextInput
          placeholder="Add Subtask"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.textInputStyle}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitEditing}
          blurOnSubmit={false}
        />
      </View>
    );
  }
}


AddSubtaskButton.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};

AddSubtaskButton.defaultProps = {
  value: '',
  onChangeText: () => {},
  onSubmitEditing: () => {},
};

export default AddSubtaskButton;
