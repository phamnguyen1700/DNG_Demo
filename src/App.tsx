import AppRoutes from "./route/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer autoClose={5000} rtl />
      <AppRoutes />
    </>
  );
}

export default App;
