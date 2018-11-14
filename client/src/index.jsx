import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './styles.css';


const Index = () => (
  <div>
    <App />
  </div>
);

ReactDOM.render(<Index />, document.getElementById('movie-times'));
