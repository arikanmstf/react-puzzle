import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PuzzlePiece extends Component {
  constructor(props) {
    super(props);
    const { currentPositionNo, realPositionNo } = props;

    this.state = {
      currentPositionNo,
      realPositionNo
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentPositionNo, realPositionNo } = nextProps;
    this.setState({
      currentPositionNo,
      realPositionNo
    });
  }

  calculatePosition(positionNo) {
    const left = ((positionNo - 1) % this.props.puzzleSize) * this.props.pieceWidth;
    const top = parseInt((positionNo - 1) / this.props.puzzleSize, 10) * this.props.pieceWidth;
    return { left, top };
  }

  isLegalMove(currentPositionNo, destinationPositionNo) {
    const currentPosition = this.calculatePosition(currentPositionNo);
    const destinationPosition = this.calculatePosition(destinationPositionNo);

    return (
      Math.round((
        Math.abs(currentPosition.left - destinationPosition.left)
          + Math.abs(currentPosition.top - destinationPosition.top)
      ) / this.props.pieceWidth) === 1
    );
  }

  handleClick = () => {
    if (this.isLegalMove(this.state.currentPositionNo, this.props.emptySquareNumber)) {
      const oldPositionNo = this.state.currentPositionNo;
      this.setState({
        currentPositionNo: this.props.emptySquareNumber
      }, () => {
        this.props.onClick({
          realPositionNo: this.props.realPositionNo,
          currentPositionNo: this.state.currentPositionNo,
          oldPositionNo
        });
      });
    }
  }

  render() {
    const currentPosition = this.calculatePosition(this.state.currentPositionNo);
    const realPosition = this.calculatePosition(this.state.realPositionNo);

    return (
      <div
        onClick={this.handleClick}
        className={this.props.className}
        style={{
          width: this.props.pieceWidth,
          height: this.props.pieceWidth,
          left: currentPosition.left,
          top: currentPosition.top,
          backgroundPositionX: -realPosition.left,
          backgroundPositionY: -realPosition.top,
          backgroundSize: this.props.pieceWidth * this.props.puzzleSize
        }}
      >
        {
          this.props.showPuzzleNumbers ?
            <span className="puzzle-number">{this.state.realPositionNo}</span>
          : null
        }
      </div>
    );
  }
}

PuzzlePiece.propTypes = {
  realPositionNo: PropTypes.number.isRequired,
  currentPositionNo: PropTypes.number,
  emptySquareNumber: PropTypes.number.isRequired,
  pieceWidth: PropTypes.number.isRequired,
  puzzleSize: PropTypes.number.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  showPuzzleNumbers: PropTypes.bool.isRequired
};

PuzzlePiece.defaultProps = {
  onClick: () => {},
  className: '',
  currentPositionNo: 1
};

export default PuzzlePiece;
