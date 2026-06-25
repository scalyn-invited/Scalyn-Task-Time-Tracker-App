import React from 'react';
import ReactDOM from 'react-dom/client';
import { TimerErrorBoundary } from './TimerErrorBoundary';
import { TimerPage } from './TimerPage';
import './styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Timer root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <TimerErrorBoundary>
      <TimerPage />
    </TimerErrorBoundary>
  </React.StrictMode>,
);
