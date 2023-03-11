import { createContext, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const handleAuthData = ( data ) => {
    setAuthData( data );
  }

  const value = { authData, handleAuthData }

  return(
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}