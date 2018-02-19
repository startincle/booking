import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap.css';
import './styles/fontawesome.css';
import './styles/App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
