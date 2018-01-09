import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  DEFAULT_START_POINT,
  DEFAULT_PUZZLE_SIZE,
  SHOW_PUZZLE_NUMBERS
} from 'modules/constants';

class Indicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      point: (
        DEFAULT_START_POINT * this.props.puzzleSize * this.props.puzzleSize
      ) * (this.props.showPuzzleNumbers ? 1 : 2)
    };

    this.timer = setInterval(() => {
      const randomMinus = parseInt(Math.random() * 10, 10);
      this.setState((prevState) => {
        return {
          point: prevState.point - randomMinus
        };
      });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isGameEnded) {
      clearInterval(this.timer);
      const score = this.state.point;
      alert(`Congratulations, your score is: ${score}`);
    }
  }

  renderTimer() {
    return (
      <b>{this.state.point.toLocaleString()}</b>
    );
  }

  render() {
    return (
      <div className="indicator-container">
        <div className="indicator-wrapper">
          <div className="indicator-row">
            <span>Your score is: </span>
            {this.renderTimer()}
          </div>
        </div>
      </div>
    );
  }
}

Indicator.propTypes = {
  puzzleSize: PropTypes.number,
  showPuzzleNumbers: PropTypes.bool,
  isGameEnded: PropTypes.bool
};

Indicator.defaultProps = {
  puzzleSize: DEFAULT_PUZZLE_SIZE,
  showPuzzleNumbers: SHOW_PUZZLE_NUMBERS,
  isGameEnded: false
};

export default Indicator;
