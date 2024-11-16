import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createRegisterUser = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await signOut(auth);
        return userCredential;
    };

    const signInUser = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        return userCredential;
    };
``
    const signInGoogle = () =>{
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() =>{
        const unSubscrirbe = onAuthStateChanged(auth, (currentUser) =>{
          console.log('saved data until sighnout',currentUser)
          setUser(currentUser);
          setLoading(false);
        });
        return ()=> unSubscrirbe();
      },[])

    const userSignOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    const authInfo = {user, createRegisterUser,signInUser,userSignOut, signInGoogle, setLoading}

    return (
        <AuthContext.Provider value={authInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;