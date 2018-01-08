import React from 'react';

import Puzzle from 'modules/puzzle/Puzzle';
import Indicator from 'modules/indicator/Indicator';

const App = () => (
  <div className="main-container">
    <h1>3 x 3 Example</h1>
    <div className="app-container">
      <Puzzle />
      <Indicator />
    </div>
    <hr />
    <h1>4 x 4 Example</h1>
    <div className="app-container">
      <Puzzle
        puzzleSize={4}
      />
      <Indicator
        puzzleSize={4}
      />
    </div>
    <hr />
    <h1>5 x 5 Example (Hiding square numbers)</h1>
    <div className="app-container">
      <Puzzle
        puzzleSize={5}
        showPuzzleNumbers={false}
      />
      <Indicator
        puzzleSize={5}
        showPuzzleNumbers={false}
      />
    </div>
  </div>
);

export default App;
