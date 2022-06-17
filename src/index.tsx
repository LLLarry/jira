import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { DevTools, loadServer } from "jira-dev-tool";
import { AppProvider } from 'context';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux'
import store from 'store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
loadServer(() => {
  root.render(
    // <React.StrictMode>
    <>
      <DevTools />
      <Provider store={store}>
        <AppProvider>
          <Router>
            <App />
          </Router>
        </AppProvider>
      </Provider>
      </>
    // </React.StrictMode>
  );
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
