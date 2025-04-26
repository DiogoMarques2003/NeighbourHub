import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

async function enableMocking() {
  if (1 === 1) return Promise.resolve();

  if (import.meta.env.DEV) {
    const worker = await import('./mocks/browser');
    return worker.default.start({ onUnhandledRequest: 'bypass' });
  }
  return Promise.resolve();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <<StrictMode>
      <App />
    </StrictMode>
  );
});
