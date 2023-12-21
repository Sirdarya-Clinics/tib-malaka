"use client"
import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  UserCredential,
  User,
  signOut,
} from 'firebase/auth';

type MovieContextType = {
  currentUser: any;
  login: any;
  logout: any;
};

const AuthContext = createContext<MovieContextType>({
  currentUser: Promise<User>,
  login: Promise<UserCredential>,
   logout: Promise<void>
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState(Object);
  const [loading, setLoading] = useState(true);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
   function logout() {
    return signOut(auth);
  }

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}