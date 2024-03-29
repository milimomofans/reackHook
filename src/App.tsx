import { useAuth } from 'context/auth-context';
import React from 'react';
import './App.css';
import {AuthenticatedApp } from './authenticated-app'
import {UnauthenticatedApp} from 'unauthenticated-app/index'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib';
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
