import 'intersection-observer';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initVision3000 } from 'vision3000-react';

initVision3000();

ReactDOM.render(<App />, document.getElementById('root'));
