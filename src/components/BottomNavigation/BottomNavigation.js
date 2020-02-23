import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';

import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
// import WhatshotIcon from '@material-ui/icons/Whatshot';
import PersonIcon from '@material-ui/icons/Person';

import styles from './BottomNavigation.module.scss';
import './activeStyle.scss';

export const navData = [
  {
    routeIndex: 1,
    to: "/phone",
    label: "Home",
    icon: <HomeIcon />,
    color: 'red',
    exact: true
  },
  {
    routeIndex: 2,
    to: "/phone/portfolio",
    label: "Portfolio",
    icon: <PhotoSizeSelectActualIcon />,
    color: '#F048C6',
    background: 'linear-gradient(45deg, #F048C6 0%, #F6EA41 100%)',
    exact: false
  },
  // {
  //   to: "/whatshot",
  //   label: "Whats hot",
  //   icon: <WhatshotIcon />,
  // color: ,
  //   exact: false
  // },
  {
    routeIndex: 3,
    to: "/phone/todo",
    label: "Todo",
    icon: <PersonIcon />,
    // color: '#537895',
    // background: 'linear-gradient(45deg, #09203F 0%, #537895 100%)',
    color: '#662D8C',
    background: 'linear-gradient(45deg, #662D8C 0%, #ED1E79 100%)',
    // color: '#662D8C',
    // // background: 'linear-gradient(45deg, #596164 0%, #868F96 100%)',
    // color: '#662D8C',
    // background: 'linear-gradient(45deg, #1B67E8 0%, #6209C3 100%)',
    exact: false
  },
  {
    routeIndex: 4,
    to: "/phone/settings",
    label: "Settings",
    icon: <SettingsIcon />,
    color: '#E27C39',
    background: 'linear-gradient(45deg, #E27C39 0%, #E3FF73 100%)',
    exact: false
  },
]

const NavItem = (props) => {
  const { to, label, icon, exact, routeIndex, location } = props;

  const [selected, setSelected] = useState(location.pathname === to ? true : false);

  useEffect(() => {
    if(location.pathname === to) 
      setSelected(true)
    else setSelected(false)
  }, [location, to])

    // const { scale } = useSpring({ scale: clicked ? 0.8 : 1 })
    // const { translate, opacity, color, height } = useSpring({ 
    const springProp = useSpring({ 
      // translate: selected ? '-50px' : '0',
      opacity: selected ? 1 : 0,
      color: selected ? props.color : 'rgb(128, 128, 128)',
      height: selected ? 15 : 0
    })
  return (
    <li key={label}>
      <NavLink to={{pathname: to, state: {routeIndex, color: props.color, bg: props.background}}} exact={exact ? true : false}>
        <animated.span 
          className={ styles.icon } 
          style={{color: springProp.color}}
        >
          { icon }
        </animated.span>
        {/* <animated.span style={{color: color.interpolate(s => s)}} className={ styles.label }> */}
        {/* <animated.span style={{height: height.interpolate(s => `${s}px`)}} className={ styles.label }> */}
        {/* <animated.span style={{transform: translate.interpolate(s => `translateY(${s})`)}} className={ styles.label }> */}
        <animated.span style={springProp} className={ styles.label }>
          { label }
        </animated.span>
      </NavLink>
    </li>
  )
}

const BottomNavigation = (props) => {
  const { location } = props;

  const [toggle, setToggle] = useState(false)
  const [routeState, setRouteState] = useState({routeIndex: 1, color: 'red', toggle: false})

  // const avSize = (x) => x.interpolate({ map: Math.abs, range: [0, 0.5, 1], output: ['scale(1)', 'scale(2)', 'scale(1)'], extrapolate: 'clamp' });
  // console.log('location.state.routeIndex: ', location.state.routeIndex == undefined ? 1 : location.state.routeIndex);
  let spring = () => ({
    left: `${(100 / navData.length) * routeState.routeIndex - (100 / navData.length)}%`,
    scale: routeState.toggle ? 1 : 0,
    color: routeState.color || 'red'
  });

  const [springProps, setSpringProps] = useSpring(spring)

  useEffect(() => {
    if(location.state && location.state.routeIndex) {
      setRouteState({
        routeIndex: location.state.routeIndex,
        color: location.state.color,
        toggle: !routeState.toggle
      })
      // setSpringProps(spring)
    }
    // eslint-disable-next-line
  }, [location])
  
  useEffect(() => {
    setSpringProps(spring)
    // eslint-disable-next-line
    }, [spring])

  return (
    <nav className={ styles.nav }>
      <ul>
        {navData.map(item => (
          <NavItem
            key={item.label}
            bg={item.background}
            {...item}
            {...props}
          />
        ))}
        <animated.li style={{left: springProps.left}} className={ styles.underline }>
          <animated.span style={{
            background: springProps.color,
            transform: springProps.scale.interpolate({
              range: [0, 0.50, 1],
              output: [1, 1.9, 1]
            }).interpolate(scale => `scaleX(${scale})`)
          }} />
        </animated.li>
      </ul>
    </nav>
  );
}

export default withRouter(BottomNavigation);
