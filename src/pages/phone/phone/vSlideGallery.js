import React, { useRef } from 'react';
import { animated, useSprings, useSpring } from 'react-spring';
import { useGesture, useDrag } from 'react-use-gesture';
import useMeasure from "react-use-measure";
import clamp from 'lodash.clamp'

import { imgData } from './data';
import styles from './vSlideGallery.module.scss';

const SpringSlide = () => {
  const left = 0;
  const right = `-${(imgData.length - 1) * 233}`;

  const [{ x }, set] = useSpring(() => ({ x: 0, config: { tension: 220, friction: 26 } }));

  const bind = useGesture({
    onDrag: ({ movement: [mx], memo = x.getValue() }) => {
      set({ x: clamp( memo + mx * 2, right, left )})
      return memo
    },
    onWheel: ({ memo = x.getValue(), movement: [,my] }) => {
      set({ x: clamp( memo + -my, right, left)})
      return memo
    }
  }, { dragDelay: true })

  return (
    <section {...bind()} className={styles.SpringSlide}>
      <animated.div
        style={{ transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}
        className={styles.SpringSlideInner}
      >
        {imgData.map((item, i) => (
          <figure
            key={i} 
            className="news__card"
          >
            <img src={`/imgs/${item.img}`} alt={ item.title } draggable="false" />
            <figcaption>
              { item.title }
            </figcaption>
          </figure>
        ))}
      </animated.div>
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <animated.div style={{ left: x.interpolate(x => `${x / right * 100}%`) }}></animated.div>
        </div>
      </div>
    </section>
  )
}
  // const bind = useGesture({
  //   onDrag: ({ direction: [xDir] }) => {
  //     set(() => {
  //       const x = clamp( Math.round(xValue.current) + xDir, max, min)
  //       xValue.current = x
  //       return { x }
  //     })
  //   },
  //   onWheel: ({ direction: [,yDir] }) => {
  //     set(() => {
  //       const x = clamp( xValue.current - yDir * 10, max, min)
  //       xValue.current = x
  //       return { x }
  //     })
  //   }
  // }, { dragDelay: true })

const VSlideGallery = () => {
  const [boundsRef, bounds] = useMeasure();
  // const xValue = useRef(0)
  // const max = `-${(imgData.length - 1) * 233}`;
  // const min = 1
  const [springBar, setBar] = useSprings(imgData.length, () => ({ scale: 0.5 }));

  // const [springs, set] = useSprings(imgData.length, i => ({ x: bounds.width, scale: 1 }));
console.log('', bounds.width);
  const index = useRef(0)
  console.log('index: ', index.current);

  const winWidth = 375 * 0.7;

  const [springs, set] = useSprings(imgData.length, i => ({
    x: i * winWidth,
    text: i === index.current ? 0 : 100,
    opacity: i === index.current ? 0 : 1,
    // x: 0,
    scale: i === index.current ? 1 : 0.9,

    // display: 'block',
    // display: i <= 1 ? 'block' : 'none'
  }))
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], cancel }) => {
    if (down && mx > winWidth / 3 || down && -mx > winWidth / 3)
      cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, imgData.length - 1)))
    set(i => {
      // if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
      const text = i === index.current ? 0 : 100
      const opacity = i === index.current ? 1 : 0
      const x = (i - index.current) * winWidth + (down ? mx : 0)
      // const scale = down ? (1 - distance / winWidth / 2) : 1
      // const x = (i - index.current) * winWidth + (down ? (i == index.current ? mx : mx * 1.35) : 0)
      const scale = down ? ((i === index.current ? 1 : 0.9) - (mx < 0 ? -mx : mx) / winWidth / 3) : i === index.current ? 1 : 0.9
      // const scale = down ? ((i == index.current ? 1 : 0.9) - distance / winWidth / 3) : i == index.current ? 1 : 0.9
      return { x, scale, text, opacity, display: 'block' }
    })
    setBar(i => {
      const scale = index.current === i ? 1 : 0.5;
      return { scale }
    })
  })

// console.log('', bounds.width);
  return (
    <section 
      ref={boundsRef}
      {...bind()}
      className={styles.container}
    >
      {springs.map(({ x, display, text, opacity, scale }, i) => (
        <animated.div
          key={i}
          {...bind()}
          style={{ 
            transform: x.interpolate(x => `translate3d(${x}px,0,0)`), 
            opacity: scale.interpolate(x => x),
            display }}
          className={styles.vSlideGallery}
        >
          <animated.figure
            
            style={{ transform: scale.interpolate(x => `scale(${x})`) }}
            // style={{ transform: x.interpolate(x => `translate3d(${-x}px,0,0)`) }}
            className="news__card"
          >
            <img src={`/imgs/${imgData[i].img}`} alt={ imgData[i].title } draggable="false" />
            <animated.figcaption style={{ 
                transform: text.interpolate(t => `translate3d(0px,${t}px,0)`),
                opacity
                // opacity: opacity.interpolate(s => index.current == i ? 1 : 0 )
              }}>
              <span>
                { imgData[i].title } - {i}
              </span>
            </animated.figcaption>
          </animated.figure>
        </animated.div>
      ))}
      <div className={styles.bar}>
        {/* <div className={styles.barInner}>
          </div> */}
          {springBar.map(({ scale }, i) => (
            <animated.div 
              style={{ 
                transform: scale.interpolate(s => `scale(${index.current == i ? 1 : s})`),
                opacity: scale.interpolate(s => `${index.current == i ? s * 0.75 : 0.35}` )
              }}
            />
          ))}
      </div>
    </section>
  )
}

export default VSlideGallery;
