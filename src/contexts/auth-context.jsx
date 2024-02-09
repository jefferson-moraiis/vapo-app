import React, {
  createContext, useContext, useEffect, useReducer, useRef,
} from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import api from '../utils/api';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => ({
    ...state,
    isAuthenticated: !!action.payload,
    isLoading: false,
    user: action.payload || null,
  }),
  [HANDLERS.SIGN_IN]: (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: action.payload,
  }),
  [HANDLERS.SIGN_OUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) return;
    initialized.current = true;

    auth.onAuthStateChanged(async (user) => {
      const isAuthenticated = !!user;
      if (isAuthenticated) {
        const { data } = await api.get(`/user/${user.uid}`);
        user = data;
      }
      console.log('🚀 ~ auth.onAuthStateChanged ~ user:', user);
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: userCredential.user,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const signUp = async ({
    email, password, name, lastName,
  }) => {
    try {
      const newUser = await api.post('/user', {
        email, password, name, lastName,
      });
      if (newUser.status === 201) {
        signIn(email, password);
      }
    } catch (error) {
      console.error(error);
      throw error.response.data ? error.response.data : error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: HANDLERS.SIGN_OUT });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state, signIn, signUp, logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
