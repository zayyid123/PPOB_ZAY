import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store';
import App from './App.tsx';
import './index.css';
import { Toaster } from './components/ui/sonner.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster position="bottom-right" richColors theme="light" closeButton />
    <App />
  </Provider>,
);
