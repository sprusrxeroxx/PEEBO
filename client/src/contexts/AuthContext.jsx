import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) { // Fix: Add `children` as a prop
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        
        return unsubscribe
    }, [])

    const value = { // Fix: Define the `value` object
        currentUser,
        signup,
    }

    return (
        <AuthContext.Provider value={value}> {/* Fix: Pass `value` */}
            {children}
        </AuthContext.Provider>
    )
}
