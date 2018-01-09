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
      puzzleSize: props.puzzleSize,
      isGameEnded: false
    };
  }

  componentWillMount() {
    this.generatePositionsArray();
    this.generatePieces();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      emptySquareNumber: nextProps.puzzleSize * nextProps.puzzleSize,
      puzzleSize: nextProps.puzzleSize
    });
  }

  onPieceClick(clickedPiece) {
    this.pieces.forEach((piece, index) => {
      if (piece.realPositionNo === clickedPiece.realPositionNo) {
        this.pieces[index].currentPositionNo = clickedPiece.currentPositionNo;
      }
    });

    this.setState({
      emptySquareNumber: clickedPiece.oldPositionNo
    }, () => {
      if (this.isGameEnded()) {
        setTimeout(() => { // css delay
          this.onGameEnded();
        }, 500);
      }
    });
  }

  onGameEnded() {
    this.setState({
      isGameEnded: true
    });
    this.props.onGameEnded();
  }

  isGameEnded() {
    return !this.pieces.some((piece) => (
      piece.realPositionNo !== piece.currentPositionNo
    ));
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

  generatePieces() {
    const size = this.state.puzzleSize;
    this.pieces = [];

    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        const realPositionNo = (i + 1) + (j * size);

        if (realPositionNo === size * size) {
          break;
        }
        const currentPositionNo = this.generateRandomNumber();
        this.pieces.push({
          currentPositionNo,
          realPositionNo
        });
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
    const size = this.state.puzzleSize;

    return !this.state.isGameEnded && this.pieces.map((piece) => (
      <PuzzlePiece
        key={piece.realPositionNo}
        onClick={(piecePositionNo) => { this.onPieceClick(piecePositionNo); }}
        pieceWidth={this.props.imageWidth / size}
        className={`puzzle-piece piece-${piece.realPositionNo}`}
        realPositionNo={piece.realPositionNo}
        currentPositionNo={piece.currentPositionNo}
        emptySquareNumber={this.state.emptySquareNumber}
        puzzleSize={this.state.puzzleSize}
        showPuzzleNumbers={this.props.showPuzzleNumbers}
      />
    ));
  }

  render() {
    const opacity = this.state.isGameEnded ? 1 : 0.4;
    return (
      <div
        style={{
          width: this.props.imageWidth,
          height: this.props.imageWidth
        }}
        className="puzzle-container"
      >
        <div
          style={{
            opacity
            width: this.props.imageWidth,
            height: this.props.imageWidth
          }}
          className="puzzle-background"
        />
        {this.renderPuzzleWrapper()}
      </div>
    );
  }
}

Puzzle.propTypes = {
  puzzleSize: PropTypes.number,
  imageWidth: PropTypes.number,
  showPuzzleNumbers: PropTypes.bool,
  onGameEnded: PropTypes.func
};

Puzzle.defaultProps = {
  puzzleSize: DEFAULT_PUZZLE_SIZE,
  imageWidth: DEFAULT_IMAGE_WIDTH,
  showPuzzleNumbers: SHOW_PUZZLE_NUMBERS,
  onGameEnded: () => {}
};

export default Puzzle;
