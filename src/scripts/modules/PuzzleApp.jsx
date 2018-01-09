import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Puzzle from 'modules/puzzle/Puzzle';
import Indicator from 'modules/indicator/Indicator';
import {
  DEFAULT_PUZZLE_SIZE,
  DEFAULT_IMAGE_WIDTH,
  SHOW_PUZZLE_NUMBERS
} from 'modules/constants';

class PuzzleApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGameEnded: false,
      showPuzzleNumbers: this.props.showPuzzleNumbers
    };
  }

  onGameEnded = () => {
    this.setState({
      isGameEnded: true,
      showPuzzleNumbers: false
    });
  }

  render() {
    return (
      <div className="app-container">
        <Puzzle
          puzzleSize={this.props.puzzleSize}
          imageWidth={this.props.imageWidth}
          showPuzzleNumbers={this.state.showPuzzleNumbers}
          onGameEnded={this.onGameEnded}
        />
        <Indicator
          puzzleSize={this.props.puzzleSize}
          showPuzzleNumbers={this.state.showPuzzleNumbers}
          isGameEnded={this.state.isGameEnded}
        />
      </div>
    );
  }
}

PuzzleApp.propTypes = {
  puzzleSize: PropTypes.number,
  imageWidth: PropTypes.number,
  showPuzzleNumbers: PropTypes.bool
};

PuzzleApp.defaultProps = {
  puzzleSize: DEFAULT_PUZZLE_SIZE,
  imageWidth: DEFAULT_IMAGE_WIDTH,
  showPuzzleNumbers: SHOW_PUZZLE_NUMBERS
};

export default PuzzleApp;
