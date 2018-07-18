import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

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
      <View style={styles.container}>
        <TextInput
          placeholder="Add Subtask"
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.textInputStyle}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitEditing}
          blurOnSubmit={false}
          enablesReturnKeyAutomatically
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
