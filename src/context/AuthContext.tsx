import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import api from '../lib/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setUserName,
  setUserEmail,
  setUserRole,
  setIsOnlineUser,
  setUserId,
} from '../slicers/userSlicer';

interface UserObject {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  tokenChecking: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tokenChecking, setTokenChecking] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const setUserRedux = useCallback(
    (userObj: UserObject) => {
      dispatch(setUserId(userObj._id));
      dispatch(setUserName(`${userObj.firstName} ${userObj.lastName}`));
      dispatch(setUserEmail(userObj.email));
      dispatch(setUserRole(userObj.role));
      dispatch(setIsOnlineUser(true));
    },
    [dispatch],
  );

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokenValid = await checkToken();
        if (!tokenValid) {
          setIsLoggedIn(false);
          setTokenChecking(false);
        } else {
          const userObj = await fetchUserWithToken();
          if (userObj) {
            setUserRedux(userObj);
            setIsLoggedIn(true);
            setTokenChecking(false);
          }
        }
      } catch (error) {
        console.error('Authentication initialization error:', error);
        setIsLoggedIn(false);
        setTokenChecking(false);
      }
    };

    initializeAuth();
  }, [setUserRedux]);

  const fetchUserWithToken = async () => {
    const res = await api.get('user');
    if (res.status === 200) {
      return res.data;
    }
    return null;
  };

  const checkToken = async () => {
    const res = await api
      .post('auth/checkToken')
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
    return res;
  };

  const login = async ({ email, password }: LoginCredentials) => {
    const res = await api.post('auth/login', { email, password });
    if (res.status === 200) {
      const userObj = await fetchUserWithToken();
      setUserRedux(userObj);
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  };

  const logout = async () => {
    await api.post('auth/logout');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, tokenChecking }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
