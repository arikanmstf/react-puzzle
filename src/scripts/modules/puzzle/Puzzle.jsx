import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  DEFAULT_PUZZLE_SIZE,
  DEFAULT_IMAGE_WIDTH,
  SHOW_PUZZLE_NUMBERS
} from 'modules/constants';

import PuzzlePiece from 'modules/puzzle/PuzzlePiece';

class Puzzle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emptySquareNumber: props.puzzleSize * props.puzzleSize,
      puzzleSize: props.puzzleSize
    };
  }

  componentWillMount() {
    this.generatePositionsArray();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      emptySquareNumber: nextProps.puzzleSize * nextProps.puzzleSize,
      puzzleSize: nextProps.puzzleSize
    });
  }

  onPieceClick(piecePositionNo) {
    this.setState({
      emptySquareNumber: piecePositionNo
    }, () => {
      this.isGameEnded();
    });
  }

  isGameEnded() {
    // TODO
    return false;
  }

  generatePositionsArray() {
    this.positions = [];
    const size = this.state.puzzleSize;

    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const orderNo = (i + 1) + (j * size);

        if (orderNo === this.state.emptySquareNumber) {
          continue; // eslint-disable-line no-continue
        }

        this.positions.push(orderNo);
      }
    }
  }

  generateRandomNumber() {
    const index = Math.floor(Math.random() * this.positions.length);
    const positionNo = this.positions[index];
    this.positions.splice(index, 1);
    return positionNo;
  }

  renderPuzzleWrapper() {
    const pieces = [];
    const size = this.state.puzzleSize;

    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const realPositionNo = (i + 1) + (j * size);
        const currentPositionNo = this.generateRandomNumber();

        if (realPositionNo === size * size) {
          break;
        }

        pieces.push(
          <PuzzlePiece
            key={realPositionNo}
            onClick={(piecePositionNo) => { this.onPieceClick(piecePositionNo); }}
            pieceWidth={this.props.imageWidth / size}
            className={`puzzle-piece piece-${realPositionNo}`}
            realPositionNo={realPositionNo}
            currentPositionNo={currentPositionNo}
            emptySquareNumber={this.state.emptySquareNumber}
            puzzleSize={this.state.puzzleSize}
            showPuzzleNumbers={this.props.showPuzzleNumbers}
          />
        );
      }
    }
    return pieces;
  }

  render() {
    return (
      <div
        style={{
          width: this.props.imageWidth,
          height: this.props.imageWidth
        }}
        className="puzzle-container"
      >
        <div className="puzzle-background" />
        {this.renderPuzzleWrapper()}
      </div>
    );
  }
}

Puzzle.propTypes = {
  puzzleSize: PropTypes.number,
  imageWidth: PropTypes.number,
  showPuzzleNumbers: PropTypes.bool
};

Puzzle.defaultProps = {
  puzzleSize: DEFAULT_PUZZLE_SIZE,
  imageWidth: DEFAULT_IMAGE_WIDTH,
  showPuzzleNumbers: SHOW_PUZZLE_NUMBERS
};

export default Puzzle;
