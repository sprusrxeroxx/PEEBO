import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // Create or update user in our database
    async function createOrUpdateUser(user) {
        if (!user) return null
        
        try {
            // Create/update user in our MongoDB database
            const response = await fetch('/api/v1/users/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firebaseId: user.uid,
                    email: user.email,
                    displayName: user.displayName || '',
                    profilePhoto: user.photoURL || ''
                })
            })
            
            if (!response.ok) {
                console.error('Failed to sync user with database')
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
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
