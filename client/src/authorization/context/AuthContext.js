import * as React from "react";

class Data {
  constructor(){

  }

  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = 'http://localhost:3000' + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
};

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = new Data ();
  const [authed, setAuthed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
 

  React.useEffect(() => {
    auth.api('/auth/isauthenticated', 'GET')
      .then(res => res.json())
      .then((res) => {
        if (res.authenticated === 'true'){
          console.log(res);
          setAuthed(true);
        }
        setIsLoading(false);
      });
  }, []);


  const value = {
    authed,
    isLoading,
    login(username, password) {
      return auth.api('/auth/login', 'POST', null, true, { username, password })
        .then(res => res.json())
        .then((res) => {
          if (res.severity === 'success') {
            setAuthed(true);
          }
          return res;
        })
    },
    logout() {
      return auth.api('/auth/logout', 'GET')
        .then(res => res.json())
        .then((res) => {
          setAuthed(false);
          return res;
        })
    },
    signup(username, password, confirmPassword){
      const data = {
        username,
        password,
        confirmPassword,
      }
      return auth.api('/auth/signup', 'POST', data)
        .then(res => res.json())
        .then((res) => {
          if (res.severity === 'success') {
            setAuthed(true);
          }
          return res;
        })
    },
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return React.useContext(authContext);
}