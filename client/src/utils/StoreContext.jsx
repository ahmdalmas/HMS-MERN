import { createContext, useReducer, useContext, useEffect } from "react";

// Define initial state
const initialState = {
  admin: null,
  requests: [],
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMIN":
      return { ...state, admin: action.payload };
    case "ADD_REQUEST":
      return { ...state, requests: [...state.requests, action.payload] };
    case "REMOVE_REQUEST":
      return { ...state, requests: action.payload };
    default:
      return state;
  }
};

const StoreContext = createContext(initialState);

// Create provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAdmin = (admin) => {
    dispatch({ type: "SET_ADMIN", payload: { admin: admin } })
  }
  const addRequest = (cms_id) => {
    // console.log('update: ' + update);
    if (!state.requests.includes(cms_id)) {
      dispatch({ type: "ADD_REQUEST", payload: cms_id });
    }
  }
  const removeRequest = (cms_id) => {
    console.log('REMOVE: ' + cms_id);
    const update = state.requests.filter((id) => id !== cms_id);
    dispatch({ type: "REMOVE_REQUEST", payload: update });
  }

  const value = {
    admin: state.admin,
    requests: state.requests,
    setAdmin,
    addRequest,
    removeRequest,
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};


const useStore = () => {
  const context = useContext(StoreContext);
  const { admin, requests } = context;

  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  useEffect(() => {
    console.log('Context: ', { admin, requests });
  }, [admin, requests]);
  return context;
};

export default useStore;


