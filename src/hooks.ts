import { useState, useEffect } from 'react';
import { OAuthProvider } from './OAuthProvider';
import { AuthResponse } from './types'
import { BASE_URL } from '../config';

interface ISignUpParams {
    name: string;
    email: string;
    password: string;
}

interface ISignInParams {
    email: string;
    password: string;
    rememberMe?: boolean; // Optional parameter
}
export const useAuth = () => {
  const [authProvider] = useState(new OAuthProvider(BASE_URL));
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);

  useEffect(() => {
    // Optionally, load user from local storage or other persistent storage
  }, []);

  const signIn = async ({email, password, rememberMe}: ISignInParams) => {
    const response = await authProvider.signIn(email, password);
    setUser(response.user);
    return { ok: response.ok, message: response.message };
       // Optionally, save user to local storage or other persistent storage
     };

     const signUp = async ({ name, email, password}: ISignUpParams) => {
       const response = await authProvider.signUp(name, email, password);
       setUser(response.user);
        return { ok: response.ok, message: response.message };
       // Optionally, save user to local storage or other persistent storage
     };

     const signOut = async () => {
       await authProvider.signOut();
       setUser(null);
       // Optionally, remove user from local storage or other persistent storage
     };

     return { user, signIn, signUp, signOut };
   };