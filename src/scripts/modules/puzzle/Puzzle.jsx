import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_PUZZLE_SIZE, DEFAULT_IMAGE_WIDTH } from 'modules/constants';
import PuzzlePiece from 'modules/puzzle/PuzzlePiece';

class Puzzle extends Component {
  constructor(props) {
    super(props);
    const size = this.props.puzzleSize;
    this.state = {
      emptySquareNumber: size * size
    };

    this.positions = [];
    this.generatePositionsArray();
  }

  onPieceClick(piecePositionNo) {
    this.setState({
      emptySquareNumber: piecePositionNo
    });
  }

  generatePositionsArray() {
    const size = this.props.puzzleSize;

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
    const size = this.props.puzzleSize;

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
            puzzleSize={this.props.puzzleSize}
          />
        );
      }
    }
    return pieces;
  }

  render() {
    return (
      <div className="puzzle-container">
        <div className="puzzle-background" />
        {this.renderPuzzleWrapper()}
      </div>
    );
  }
}

Puzzle.propTypes = {
  puzzleSize: PropTypes.number,
  imageWidth: PropTypes.number
};

Puzzle.defaultProps = {
  puzzleSize: DEFAULT_PUZZLE_SIZE,
  imageWidth: DEFAULT_IMAGE_WIDTH
};

export default Puzzle;
