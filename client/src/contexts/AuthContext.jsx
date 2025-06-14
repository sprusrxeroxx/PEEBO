import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase.js'
import firebase from 'firebase/compat/app'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

    // Create or update user in our database
    async function createOrUpdateUser(user) {
        if (!user) return null
        
        try {
            // Create/update user in our MongoDB database
            const response = await fetch(`${API_BASE_URL}/api/v1/users/sync`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firebaseId: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || '',
                    profilePhoto: user.photoURL || '',
                    isAnonymous: user.isAnonymous || false // Track if user is anonymous
                })
            })
            
            if (!response.ok) {
                console.error(`Failed to sync user with database: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.error('Error syncing user with database:', error)
        }
        
        return user
    }

    async function signup(email, password) {
        try {
            // Create a new user with email and password
            const result = await auth.createUserWithEmailAndPassword(email, password)
            
            // Sync the new user with our database
            return await createOrUpdateUser(result.user)
        } catch (error) {
            console.error("Error during signup:", error)
            throw error
        }
    }

    async function login(email, password) {
        try {
            // Explicitly sign in with email and password, which creates a new session
            const result = await auth.signInWithEmailAndPassword(email, password)
            
            // Sync the user with our database
            return await createOrUpdateUser(result.user)
        } catch (error) {
            console.error("Error during login:", error)
            throw error
        }
    }

    // New Google sign-in function
    async function signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const result = await auth.signInWithPopup(provider)
            
            // Sync the user with our database
            return await createOrUpdateUser(result.user)
        } catch (error) {
            console.error("Error during Google sign-in:", error)
            throw error
        }
    }

    // New GitHub sign-in function
    async function signInWithGithub() {
        try {
            const provider = new firebase.auth.GithubAuthProvider()
            const result = await auth.signInWithPopup(provider)
            
            // Sync the user with our database
            return await createOrUpdateUser(result.user)
        } catch (error) {
            console.error("Error during GitHub sign-in:", error)
            throw error
        }
    }

    // Add this new anonymous sign-in function
    async function signInAnonymously() {
        try {
            // Firebase anonymous auth
            const result = await auth.signInAnonymously();
            
            // Sync the anonymous user with our database
            return await createOrUpdateUser(result.user);
        } catch (error) {
            console.error("Error during anonymous sign-in:", error);
            throw error;
        }
    }

    function logout() {
        // Sign out only affects the current session
        return auth.signOut()
    }

    useEffect(() => {
        // This listener is only for the current browser session
        // It will not affect other browser sessions or devices
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                // When user signs in, sync with database
                await createOrUpdateUser(user)
            }
            setCurrentUser(user)
            setLoading(false)
        })
        
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        signInWithGoogle,
        signInWithGithub,
        signInAnonymously,
        isAnonymous: currentUser?.isAnonymous || false
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
