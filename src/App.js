import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupForm from "./Components/Form/SignupForm";
import Header from "./Components/Header/Header";
import LogInForm from "./Components/Form/LogInForm";
import Welcome from "./Components/Welcome/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
