import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Toaster 
      toastOptions={{
          style: { fontSize: '0.7rem' }, // Reduced font size
      }}
      />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
