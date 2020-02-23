import React, { useState, useCallback, useEffect, forwardRef
  // , useRef, useImperativeHandle
 } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
// import useMeasure from './useMeasure'
import useMeasure from "react-use-measure";
import Portal from '../../../components/Portal/Portal';
// import UseWhyDidYouUpdate from '../../UseWhyDidYouUpdate';
import uuidv4 from 'uuid/v4';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import CancelIcon from '@material-ui/icons/Cancel';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import useLocalStorage from '../../../hooks/useLocalStorage';
import useRouter from '../useRouter';
import { content } from '../phoneIndex.module.scss';
import styles from './todo.module.scss';

import { navData } from '../../../components/BottomNavigation/BottomNavigation';

const ChevronIcon = ({fill = "rgba(0, 0, 0, 0.65"}) => (
  <svg viewBox="0 0 22.77 9.83">
    <path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 1l10.4 7.83 10.37-7.8"
    />
  </svg>
)

const TodoItem = forwardRef((props, ref) => {
  const { todo, index, completeTodo, removeTodo } = props;
  // UseWhyDidYouUpdate("TodoItem: ", props);
  // const cardRef = useRef(null)

  // useImperativeHandle(ref, () => ({
  //   getStyle: () => {
  //     // const { width, height } = cardRef.current.getBoundingClientRect()
  //     const d = cardRef.current.getBoundingClientRect()
  //     console.log('d: ', d);
  //     return d.height
  //     // return {
  //     //   width: d.width,
  //     //   height: d.height,
  //     // }
  //   }
  // }))

  return (
    // < ref={cardRef} className={styles.item}>
    <>
      <span style={{
        color: todo.isCompleted && "green",
        textDecoration: todo.isCompleted && "line-through"
      }}
      >
        {todo.text}
      </span>
        <button onClick={() => completeTodo(index)}>
          {todo.isCompleted ? <UndoIcon /> : <CheckIcon />}
        </button>
        <button onClick={() => removeTodo(index)}>
          <DeleteForeverIcon />
        </button>
    </>
  );
})

const TodoForm = (props) => {
  const { show, addTodo, setShow } = props;

  const [value, setValue] = useState("");
  const [boundsRef, bounds] = useMeasure()

  const handleSubmit = useCallback(event => {
    event.preventDefault();
    addTodo(value);
    setValue("");
    setShow(false);
  }, [addTodo, setValue, setShow, value]);

  const dragLimit = 50,
  overlayOpacity = 0.6,
  defaultStyle = { y: `translateY(0px)`, opacity: 0, visibility: "collapse" };

  const [{ y, opacity }, set] = useSpring(() => (defaultStyle));

  useEffect(() => {
    if(show) set({ y: `translateY(-${bounds.height}px)`, opacity: overlayOpacity })
    else if(!show) set(defaultStyle)
    // eslint-disable-next-line
  }, [show, set])

  // TODO set config alt efter om der dragges eller ej
  const bind = useDrag(({ down, movement: [_,my],  cancel }) => {
    if(!show) return set(defaultStyle);
    if (down && my > dragLimit) {
      setShow(false)
      cancel()
    }
    else 
      set({
        y: `translateY(-${down ? (my < 0 ? 0 : my) - bounds.height : bounds.height}px)`,
        opacity: down ? overlayOpacity - (my < 0 ? 0 : my) / bounds.height / 2 : overlayOpacity,
      })
  })
  return (
    <animated.section ref={boundsRef} {...bind()} style={{transform: y}} className={styles.container}>
      <button className={styles.cancelButton}>
        <ChevronIcon />
      </button>
      <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
        <input
          type="text"
          name="todo"
          value={value}
          placeholder="New todo"
          onChange={event => setValue(event.target.value)}
          required
        />
        <button className={styles.submitButton} type="submit">
          Add todo
        </button>
      </form>
      <Portal id={"todoRoot"}>
        <animated.div 
          // onClick={() => setShow(false)}
          {...bind()} 
          style={{opacity, visibility: opacity.interpolate(o => o === 0 ? 'collapse' : 'visible')}} className={styles.overlay} />
      </Portal>
    </animated.section>
  );
}


const Todo = () => {
  const { location } = useRouter();
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [todos, setTodos] = useLocalStorage("todos", [
    {
      id: uuidv4(),
      text: "Learn about React",
      isCompleted: false
    },
    {
      id: uuidv4(),
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      id: uuidv4(),
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  // const [cardNodes] = useState(() => new Map())
  // const addCardNode = useCallback((node, i) => node && cardNodes.set(i, node), [cardNodes])
  // const getOpenedCard = useCallback(i => cardNodes.get(i), [cardNodes])
  // useEffect(() => {
  //   console.log('', getOpenedCard(5).getStyle());
  // }, [cardNodes, todos])


  const addTodo = useCallback((text) => {
    const newTodos = [...todos, {id: uuidv4(), text, isCompleted: false}];
    setTodos(newTodos);
  }, [todos, setTodos])

  const completeTodo = useCallback(index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }, [todos, setTodos])

  const removeTodo = useCallback(index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }, [todos, setTodos]);

  const animatedTodos = useTransition(todos, item => item.id, {
    // TODO find højde og animere til det istedet for en hardcoded
    // måske brug det ref træk fra react-spring open animation ting
    from: { height: '3.25rem', marginBottom: 8, opacity: 0, transform: 'translate3d(0px,100px,0) scale(0.5)' },
    enter: { height: '3.25rem', marginBottom: 8, opacity: 1, transform: 'translate3d(0px,0px,0) scale(1)' },
    leave: () => async (next) => {
      await next({ opacity: 0, transform: 'translate3d(200px,0,0) scale(1)' })
      await next({ height: '0rem', marginBottom: 0 })
    },
    trail: 500 / todos.length,
    unique: true,
  });

  return (
    <div 
      id="todoRoot"
      className={ content }
      style={{ background: navData[2].background }}
    >
      <h1 className={styles.title}>
        My Todos
      </h1>
      <section className={ styles.todo }>
        <button 
          onClick={() => setShowTodoForm(s => !s)}
          className={styles.addTodoButton}
        >
          <AddIcon />
        </button>
        <TodoForm
          show={showTodoForm}
          setShow={setShowTodoForm}
          addTodo={addTodo}
        />
        <ul>
          {animatedTodos.map(({item, props, key}, i) => (
            <animated.li
              
              key={key}
              className={styles.item}
              style={props}
            >
              <TodoItem
                // ref={n => addCardNode(n, i)}
                index={i}
                todo={item}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
            </animated.li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Todo;
