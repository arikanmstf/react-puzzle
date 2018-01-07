import React from 'react';

import Puzzle from 'modules/puzzle/Puzzle';
import Indicator from 'modules/indicator/Indicator';

const App = () => (
  <div className="main-container">
    <div className="game-container">
      <Puzzle />
      <Indicator />
    </div>
  </div>
);

export default App;
