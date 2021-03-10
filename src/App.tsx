import { useAuth } from 'context/auth-context';
import React from 'react';
import './App.css';
import {AuthenticatedApp } from './authenticated-app'
import {UnauthenticatedApp} from 'unauthenticated-app/index'
// import {TsReactTest} from 'screens/ts-react-test/index'
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
