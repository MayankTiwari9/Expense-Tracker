import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupForm from "./Components/Form/SignupForm";
import Header from "./Components/Header/Header";
import LogInForm from "./Components/Form/LogInForm";
import Welcome from "./Components/Welcome/Welcome";
import UserProfile from "./Components/UserProfile/UserProfile";
import ForgotPassword from "./Components/Form/ForgotPassword";
import Expense from "./Components/Expense/Expense";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {token && <Route path="/" element={<Expense />} />}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/updateprofile" element={<UserProfile />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
