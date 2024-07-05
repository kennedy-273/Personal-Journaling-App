import React, { useContext, useState, useEffect, useRef } from "react";

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  // Simulate a user object
  const simulatedUser = { id: "simulatedUser", name: "Simulated User" };
  
  const [user, setUser] = useState(simulatedUser); // Set to simulatedUser by default for bypass
  const realmRef = useRef(null);

  useEffect(() => {
    // Bypass the actual Realm operations
    console.log("Bypassing Realm operations for development/testing");

    return () => {
      // Bypass cleanup
      console.log("Bypassing cleanup");
    };
  }, [user]);

  const signIn = async (email, password) => {
    console.log(`Simulating sign-in for ${email}`);
    setUser(simulatedUser); // Set user to simulatedUser on sign-in
  };

  const signUp = async (email, password) => {
    console.log(`Simulating sign-up for ${email}`);
    // No need to change user state here, assuming sign-up is followed by sign-in
  };

  const signOut = () => {
    console.log("Simulating sign-out");
    setUser(null); // Set user to null on sign-out
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };