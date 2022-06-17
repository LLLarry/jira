import React from 'react';
import logo from './logo.svg';
import './App.less';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { Unauthenticated } from 'unauthenticated';
import { Test } from 'Test';
function App() {
  const { user } = useAuth()
  console.log(user)
  return <>
  {/* <Test></Test> */}
    {
      user ? <AuthenticatedApp /> : <Unauthenticated />
    }
  </>
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
