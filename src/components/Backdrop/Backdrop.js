import React from 'react';
import { TweenLite } from "gsap";
import { Transition } from "react-transition-group";

import './Backdrop.scss';

const Backdrop = ({
  show,
  setShow,
  enterDuration = 0.5,
  exitDuration = 0.5,
  opacity = 0.7,
  bgColor = "rgb(0, 0, 0)"
}) => {
  
  const enterDelay = enterDuration / 10;
  const enterDura = enterDelay * 9;
  const exitDelay = exitDuration / 10;
  const exitDura = exitDelay * 9;

  return (
    <Transition
      timeout={{ enter: enterDuration * 1000, exit: exitDuration * 1000 }}
      mountOnEnter
      unmountOnExit
      appear={true}
      in={show}
      addEndListener={node =>
        TweenLite.fromTo(
          node,
          show ? enterDura : exitDura,
          { opacity: show ? 0 : opacity },
          { opacity: show ? opacity : 0 }
        )
      }
    >
      <div
        className="backdrop"
        style={{ background: bgColor }}
        onClick={() => setShow(false)}
      />
    </Transition>
  );
};
export default Backdrop