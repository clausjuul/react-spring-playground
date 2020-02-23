import React from "react";
import { withRouter } from 'react-router-dom';
import { TimelineLite as timeline } from "gsap";
import { Transition } from "react-transition-group";

import { enterDefaultTimeline, exitDefaultTimeline } from "./ModalDefaultTimelines";
import "./Modal.scss";
import Backdrop from "./Backdrop";

const Modal = ({
  history,
  children,
  show,
  setShow,
  backTo,
  buildProps = true,
  enterTimeline = enterDefaultTimeline,
  exitTimeline = exitDefaultTimeline,
  enterDuration = 0.5,
  exitDuration = 0.35,
  overlayOpacity,
  overlayBgColor,
}) => {

  const tlEnter = new timeline({ paused: true });
  const tlExit = new timeline({ paused: true });

  const callback = (setShow, duration, to) => {
    setShow(false);
    setTimeout(() => {

      if (to) history.push(to);
      else history.goBack();

    }, (duration * 1000));
  };

  return (
    buildProps && (
      <Transition
        timeout={{ enter: enterDuration * 1000, exit: exitDuration * 1000 }}
        mountOnEnter
        unmountOnExit
        appear={true}
        in={show}
        addEndListener={node => {
          let canScroll = (node.firstChild.clientHeight > node.clientHeight ? true : false);

          let enter = enterTimeline(node, tlEnter, enterDuration, canScroll, buildProps);
          let exit = exitTimeline(node, tlExit, exitDuration, canScroll, buildProps);

          show ? enter.play() : exit.play();
        }}
      >
        <>
          <div className="modal">
            <div className="modal__inner">
              <span
                className="modal__close"
                data-closemodal
                onClick={() => callback(setShow, exitDuration, backTo)}
              >
                X
              </span>
              {children}
            </div>
          </div>
          <Backdrop
            show={show}
            setShow={setShow}
            enterDuration={enterDuration}
            exitDuration={exitDuration}
            opacity={overlayOpacity}
            bgColor={overlayBgColor}
          />
        </>
      </Transition>
    )
  );
};
export default withRouter(Modal);
