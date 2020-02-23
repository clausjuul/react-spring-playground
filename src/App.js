import React from 'react';

import Routes from './routes';
import Navigation from './components/Navigation/Navigation';
// import BottomNavigation from './components/BottomNavigation/BottomNavigation';

const App = () => {
  return (
    <>
      <Navigation />
      {/* <BottomNavigation /> */}
      <Routes />
    </>
  );
}

export default App;
