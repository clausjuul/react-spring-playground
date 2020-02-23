import React, { useState, useEffect, useMemo } from 'react'
import { useTrail, animated } from 'react-spring'

const TextSplit = ({ text }) => {
  const chars = useMemo(() => text.split(''), [text]);

  // const startStyle = { x: 20, opacity: 0, config: { tension: 350, friction: 32}}
  // const endStyle = { x: 0, opacity: 1, config: { tension: 350, friction: 32}}
  // const [trail, setTrail] = useTrail(chars.length, () => (startStyle));
  // useEffect(() => {setTimeout(() => setTrail(endStyle))});

  const [show, setShow] = useState(false);
  const trail = useTrail(chars.length, { x: show ? 0 : 20, opacity: show ? 1 : 0,  config: { tension: 350, friction: 32}});
  useEffect(() => {setTimeout(() => setShow(true), 250)});

  return (
    trail.map(({ x, ...rest }, index) => (
      <animated.span key={index} style={{ ...rest, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>{chars[index]}</animated.span>
    ))
  )
}

export default TextSplit;
