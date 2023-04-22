import "./App.scss";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Calendar from "./components/Calendar";
import ContactForm from "./components/Contact"
import AboutUs from "./components/About"
function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/calendar" element={<Calendar/>} />
                    <Route path="/contact" element={<ContactForm />} />
                    <Route path="/about" element={<AboutUs />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;