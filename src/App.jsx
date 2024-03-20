import HomePage from "./pages/HomePage";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { DataProvider } from "./Context/DataContext";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BookDetail from "./pages/BookDetail";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div className="app">
      <DataProvider>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/:bookTitle" element={<BookDetail />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
