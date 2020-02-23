import React, { useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring'

import useRouter from '../useRouter';
import { content } from '../phoneIndex.module.scss';
import { trailsText } from './settings.module.scss';
import { navData } from '../../../components/BottomNavigation/BottomNavigation';

const Settings = () => {
  const { location } = useRouter();
  const [show, setShow] = useState(false);

const items = ['Fuc***g', 'Awesome', 'shit']
// const config = { mass: 5, tension: 2000, friction: 200 }

  const trail = useTrail(items.length, {
    // config,
    delay: 300,
    opacity: show ? 1 : 0,
    x: show ? 0 : 20,
    height: show ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  useEffect(() => {setShow(true)}, [])

  return (
    <div 
      className={ content } 
      style={{ background: navData[3].background }}
      onClick={() => setShow(!show)}
    >
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          className={ trailsText }
          key={items[index]}
          style={{ ...rest, transform: x.interpolate(x => `translate3d(${x}%,0,0)`) }}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}
export default Settings;
