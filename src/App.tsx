import React from 'react';
import AppRoutes from './route/AppRoutes';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>      
      <ToastContainer autoClose={5000}/>  {/* Add ToastContainer */}
      <AppRoutes />
    </>
  );
}

export default App;
