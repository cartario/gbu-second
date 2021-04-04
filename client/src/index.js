import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './redux'
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>        
      </Provider>      
    </Router>    
  </React.StrictMode>,
  document.getElementById('root')
);
