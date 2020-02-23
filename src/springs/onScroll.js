import React, { useState, useCallback } from 'react'
// import ReactDOM from 'react-dom'
import { useSpring, animated } from 'react-spring/hooks'

function Text({ children, offset, pos, start, end }) {
  const [transform] = useState(() =>
    offset.interpolate({ range: [start, end], output: [100, 0], extrapolate: 'clamp' }).interpolate(s => `translate3d(${s}px,0,0)`),
  )
  const [opacity] = useState(() => offset.interpolate([start, end], [0, 1]))
  return <animated.div style={{ position: 'absolute', left: 0, top: `${pos * 100}vh`, transform, opacity }}>{children}</animated.div>
}

const OnScroll = () => {
  const [{ scroll }, set] = useSpring(() => ({ scroll: 0 }))
  const onScroll = useCallback(e => void set({ scroll: e.target.scrollTop / (window.innerHeight / 2) }), [])
  return (
    <div class="container" onScroll={onScroll}>
      <div style={{ position: 'relative', height: '200vh', width: '100%', overflow: 'hidden' }}>
        <Text offset={scroll} pos={0} start={0} end={0.5} children="lorem" />
        <Text offset={scroll} pos={0.5} start={1} end={0.5} children="ipsum" />
        <Text offset={scroll} pos={1} start={0.5} end={1} children="dolor" />
        <Text offset={scroll} pos={1.5} start={1.5} end={2} children="sit" />
      </div>
    </div>
  )
}

export default OnScroll;
