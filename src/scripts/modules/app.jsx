import React from 'react';

import Puzzle from 'modules/PuzzleApp';

const App = () => (
  <div className="main-container">
    <h1>3 x 3 Example</h1>
    <Puzzle />
    <hr />
    <h1>4 x 4 Example</h1>
    <Puzzle puzzleSize={4} />
    <hr />
    <h1>5 x 5 Example (Hiding square numbers)</h1>
    <Puzzle
      puzzleSize={5}
      showPuzzleNumbers={false}
    />
  </div>
);

export default App;
