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
            console.log('User synced with database:', response)
            if (!response.ok) {
                console.error('Failed to sync user with database')
            }
        } catch (error) {
            console.error('Error syncing user with database:', error)
        }
        
        return user
    }

    async function signup(email, password) {
        const result = await auth.createUserWithEmailAndPassword(email, password)
        return await createOrUpdateUser(result.user)
    }

    async function login(email, password) {
        const result = await auth.signInWithEmailAndPassword(email, password)
        return await createOrUpdateUser(result.user)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
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
