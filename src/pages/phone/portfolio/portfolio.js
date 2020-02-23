import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring'
// import { Context } from "./context";

import useRouter from '../useRouter';
import { content } from '../phoneIndex.module.scss';
import styles from './portfolio.module.scss';
import { navData } from '../../../components/BottomNavigation/BottomNavigation';

const data = [
  {
    title: "awesome title",
    text: "more text & more more more!"
  },
  {
    title: "awesome title",
    text: "more text & more more more!"
  },
  {
    title: "awesome title",
    text: "more text & more more more!"
  },
  {
    title: "awesome title",
    text: "more text & more more more!"
  },
  {
    title: "awesome title",
    text: "more text & more more more!"
  },
]

const Portfolio = ({ fromLeft }) => {
  const { location } = useRouter();
  
  const [show, setShow] = useState(false);

  const trail = useTrail(data.length, { xy: show ? [0, 1] : [fromLeft ? 50 : -50, 0.7], opacity: show ? 1 : 0,  config: { tension: 450, friction: 32}});

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 250);
    return () => clearTimeout(timer);
  });
  // location.state && location.state.bg || 'red'
  return (
    <div className={ content } style={{ background: navData[1].background }}>
      <h2>Portfolio</h2>

      <ul className={ styles.container }>
        {trail.map(({ xy, height, ...rest }, index) => (
          <animated.li
            key={index}
            style={{ ...rest, transform: xy.interpolate((x, y) => `translate3d(${x}%,0,0) scale(${y})`) }}
          >
            <h2>{data[index].title}</h2>
          </animated.li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
