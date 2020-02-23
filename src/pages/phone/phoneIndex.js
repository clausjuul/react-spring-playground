import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import useRouter from './useRouter';
// import { ContextProvider, Context } from "./context";

import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

import Phone from './phone/phone';
import Settings from './settings/settings';
import Portfolio from './portfolio/portfolio';
import Todo from './todo/todo';

import styles from './phoneIndex.module.scss';

// const Context = React.createContext([{}, () => {}]);

const PhoneIndex = () => {
  // const [goLeft, setGoLeft] = useContext(Context);
// console.log('go: ', goLeft);
  const { location } = useRouter();
  const { state } = location;

  const [fromLeft, setFromLeft] = useState(true);
  const [routeIndex, setRouteIndex] = useState(null);
  // console.log('state.routeIndex: ', state.routeIndex);
  // console.log('routeIndex: ', routeIndex);
  useEffect(() => {
    if(state && state.routeIndex) {
      setFromLeft(state.routeIndex > routeIndex ? true : false);
      setRouteIndex(state.routeIndex === null ? 1 : state.routeIndex);
    }
    // console.log('index: ', fromLeft);
    // eslint-disable-next-line
  }, [location])
  // console.log('routeIndex: ', routeIndex === null);
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 1, transform: `translate3d(${routeIndex === null ? '0%' : state.routeIndex < routeIndex ? '-100%' : '100%'}, 0, 0)`},
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: `translate3d(${routeIndex === null ? '100%' : state.routeIndex < routeIndex ? '100%' : '-100%'}, 0, 0)`},
  });

  return (
    <>
      <section className={ styles.container }>
        <img className={styles.notch} src="/notch.png" alt="notch" />
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} className={ styles.inner }>
            <Switch location={item}>
              <Route exact path="/phone" component={Phone} />
              {/* <Route path="/phone/portfolio" component={Portfolio} /> */}
              <Route path="/phone/portfolio" render={(props) => <Portfolio fromLeft={fromLeft} {...props} />} />
              <Route path="/phone/todo" component={Todo} />
              <Route path="/phone/settings" component={Settings} />
            </Switch>
          </animated.div>
        ))}
        <BottomNavigation />
      </section>
    </>
  );
}

export default PhoneIndex;
