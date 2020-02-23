import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PhoneIndex from './pages/phone/phoneIndex';
import Home from './pages/home/home';

const Routes = () => {
  return (
    <>
      {/* <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/open2full/:card" component={Open2full} />
        <Route path="/open2full" component={Open2full} />
        <Route exact path="/morph" component={Morph} />
      </Switch> */}
      <Route exact path="/" component={Home} />
      <Route path="/phone" component={PhoneIndex} />
    </>
  );
}

export default Routes;
