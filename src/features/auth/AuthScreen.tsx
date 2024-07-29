import LoginUser from './components/LoginUser.tsx';
import CreateUser from './components/CreateUser.tsx';
import useBreakpoint from '../../hooks/useBreakpoint.ts';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../app/store';

export default function AuthScreen() {
  const isMobile = useBreakpoint('md').isBelowMd;
  const [showRegister, setShowRegister] = useState(false);
  const varToken = useAppSelector((state: RootState) => state.auth.token);
  const isUserAuthenticated = useAppSelector((state: RootState) => state.auth.isUserAuthenticated);
  const currentUserId = useAppSelector((state: RootState) => state.auth.userId);

  const toggleRegister = () => {
    setShowRegister(prevState => !prevState);
  };


  
  useEffect(() => {
    console.log('auth',isUserAuthenticated);
    console.log('token',varToken);
    console.log('id',currentUserId);
  }, [])

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="md:w-[30%] w-[90%] rounded-[10px] md:px-0 mx-auto bg-white">
          <div className="w-full">
            {showRegister ? (
              <LoginUser toggleRegister={toggleRegister} />
            ) : (
              <CreateUser toggleRegister={toggleRegister} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Logo() {
  return (
    <div className="flex flex-row gap-5 items-center">
      <p className="text-3xl text-primary">PLACEHOLDER</p>
    </div>
  );
}
