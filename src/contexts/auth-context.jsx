import {
  createContext, useContext, useEffect, useReducer, useRef, useState,
} from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase';

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
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user,
          })
          : ({
            isLoading: false,
          })
      ),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logOut: () => {},
  skip: () => {},
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [user, setUser] = useState(null);

  const initialize = () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        const userData = {
          id: userCredential.uid,
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: userCredential.displayName,
          email: userCredential.email,
        };
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: userData,
        });
        setUser(userCredential);
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE,
        });
      }
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const skip = () => {
    try {
      const isAuthenticated = window.localStorage.setItem('authenticated', 'true');
      if (isAuthenticated && user !== null) {
        const userData = {
          id: user.uid,
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: user.displayName,
          email: user.email,
        };

        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: userData,
        });
      } else {
        dispatch({
          type: HANDLERS.SIGN_OUT,
        });
      }
    } catch (err) {
      console.error(err);
      window.sessionStorage.removeItem('authenticated');
    }
  };

  const signIn = async (email, password) => {
    console.log('AQI', email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('🚀 ~ signUp ~ userCredential:', userCredential);

      // Aqui você define o estado local `user`
      window.localStorage.setItem('authenticated', 'true');
      const userData = {
        id: user.uid, // AQUI: Você está acessando `user` antes de ser atualizado
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: user.displayName, // E AQUI
        email: user.email, // E AQUI
      };
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: userData,
      });
      setUser(userCredential.user);
    } catch (err) {
      window.sessionStorage.removeItem('authenticated');
    }
  };

  const signUp = async (email, name, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      const userData = {
        id: user.uid,
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: user.displayName,
        email: user.email,
      };

      window.sessionStorage.setItem('authenticated', 'true');

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: userData,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to sign up with email and password');
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
      window.sessionStorage.removeItem('authenticated');
      dispatch({
        type: HANDLERS.SIGN_OUT,
      });
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
