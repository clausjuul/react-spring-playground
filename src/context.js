import { createContext } from "react";

const Context = createContext({});

export const ContextProvider = Context.Provider;
export const ContextConsumer = Context.Consumer;
export default Context;



// import React, { createContext, useContext, useReducer } from "react";

// export const Context = createContext();

// export const ContextProvider = ({ reducer, initialState, children }) => (
//   <Context.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </Context.Provider>
// );

// export const GetContext = () => useContext(Context);


// import { StateProvider } from "../state";

// const App = () => {
//   const initialState = {
//     theme: { primary: "green" }
//   };

//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "changeTheme":
//         return {
//           ...state,
//           theme: action.newTheme
//         };

//       default:
//         return state;
//     }
//   };

//   return (
//     <StateProvider initialState={initialState} reducer={reducer}>
//       // App content ...
//     </StateProvider>
//   );
// };

// import { useStateValue } from "./state";

// const ThemedButton = () => {
//   const [{ theme }, dispatch] = useStateValue();
//   return (
//     <Button
//       primaryColor={theme.primary}
//       onClick={() =>
//         dispatch({
//           type: "changeTheme",
//           newTheme: { primary: "blue" }
//         })
//       }
//     >
//       Make me blue!
//     </Button>
//   );
// };