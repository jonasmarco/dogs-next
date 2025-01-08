'use client';

import logout from '@/actions/logout';
import {User} from '@/actions/user-get';
import validateToken from '@/actions/validate-token';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IUserContext {
  user: User | null;
  setUserState: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useContext deve estar dentro do Provider');
  }
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) {
  const [userState, setUserState] = useState<User | null>(user);

  useEffect(() => {
    async function validate() {
      const {ok} = await validateToken();
      if (!ok) {
        setUserState(null);
        await logout();
      }
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{user: userState, setUserState}}>
      {children}
    </UserContext.Provider>
  );
}
