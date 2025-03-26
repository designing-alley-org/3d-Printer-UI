import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ToastContainer autoClose={1000} hideProgressBar/>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
