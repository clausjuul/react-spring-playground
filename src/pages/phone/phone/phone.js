import React, { useRef } from 'react';
import { animated, useSprings, useSpring } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import clamp from 'lodash.clamp'
import { imgData } from './data';
import TextSplit from '../../../springs/textSplit';
import styles from './phone.module.scss';

import VSlideGallery from './vSlideGallery';

// const newsData = [
//   {
//     to: "/",
//     img: "1.jpg",
//     title: "Home",
//   },
//   {
//     to: "/",
//     img: "2.jpg",
//     title: "Home",
//   },
//   {
//     to: "/",
//     img: "3.jpg",
//     title: "Home",
//   },
//   {
//     to: "/",
//     img: "4.jpg",
//     title: "Home",
//   },
//   {
//     to: "/",
//     img: "5.jpg",
//     title: "Home",
//   },
//   {
//     to: "/",
//     img: "1.jpg",
//     title: "Home",
//   }
// ]

const SimpleSlide = () => {
  return (
    <section className={styles.simpleWrapper}>
      <h2 className={styles.title}>
        <TextSplit text={"Nyheder"} />
      </h2>
      <span className={styles.seeMore}>Se alle</span>
      <div className={styles.simple}>
        {imgData.map(({img, title}, i) => (
          <figure key={title + i} className="news__card">
            <img src={`/imgs/${img}`} alt={ title } />
            <figcaption>
              { title }
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

const SlideWithSprings = () => {
  // const [boundsRef, bounds] = useMeasure()
  const xValue = useRef(0)
  const max = `-${(imgData.length - 1) * 233}`;
  const min = 1

  const [springs, set] = useSprings(imgData.length, () => ({ x: xValue.current }));

  const bind = useGesture({
    onDrag: ({ direction: [xDir] }) => {
      set(() => {
        const x = clamp( Math.round(xValue.current) + xDir, max, min)
        xValue.current = x
        return { x }
      })
    },
    onWheel: ({ direction: [,yDir] }) => {
      set(() => {
        const x = clamp( xValue.current - yDir * 10, max, min)
        xValue.current = x
        return { x }
      })
    }
  }, { dragDelay: true })

  return (
    <div
      // ref={boundsRef} 
      {...bind()}
      className={styles.box}
    >
      {springs.map(({ x }, i) => (
        <animated.figure
          key={i} 
          style={{ transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}
          className="news__card"
        >
          <img src={`/imgs/${imgData[i].img}`} alt={ imgData[i].title } draggable="false" />
          <figcaption>
            { imgData[i].title }
          </figcaption>
        </animated.figure>
      ))}
    </div>
  )
}

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

const News = () => {

  return (
      <>
    {/* <section className={styles.content}> */}
      <SpringSlide />
      {/* <VSlideGallery /> */}
      {/* <SimpleSlide /> */}
      <SlideWithSprings />
    {/* </section> */}
      </>
  )
}

const Phone = () => {

  return (
    <>
      <section className={ styles.content } >
        <News />
      </section>
    </>
  );
}

export default Phone;
