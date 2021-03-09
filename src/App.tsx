import React from 'react';
import './App.css';
// import {ProjectListScreen} from 'screens/project-list/index'
// import {TsReactTest} from 'screens/ts-react-test/index'
import {LoginScreen} from 'screens/login/index'
function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      <LoginScreen />
      {/* <TsReactTest></TsReactTest> */}
    </div>
  );
}

export default App;
