import React from 'react';
import { RecoilRoot } from 'recoil';
import { Reset } from 'styled-reset';

import IndexRouter from './router';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Reset />
      <IndexRouter />
    </RecoilRoot>
  );
};

export default App;
