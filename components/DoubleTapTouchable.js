import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

class DoubleTapArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevTouchTimeStamp: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const now = new Date().getTime();

    if (this.state.prevTouchTimeStamp && (now - this.state.prevTouchTimeStamp) < this.props.delay) {
      this.setState({ prevTouchTimeStamp: null });
      this.props.onDoubleTap(e);
    } else {
      this.setState({ prevTouchTimeStamp: now });
      setTimeout(() => {
        if (this.state.prevTouchTimeStamp) {
          this.setState({ prevTouchTimeStamp: null });
          this.props.onSingleTap(e);
        }
      }, this.props.delay);
    }
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.handleClick}>
          {this.props.children}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

DoubleTapArea.defaultProps = {
  delay: 200,
  onSingleTap: () => {},
  onDoubleTap: () => {},
};

DoubleTapArea.propTypes = {
  delay: PropTypes.number,
  onSingleTap: PropTypes.func,
  onDoubleTap: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DoubleTapArea;

