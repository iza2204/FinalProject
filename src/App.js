import "./App.scss";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Calendarsheet from "./components/Calendar";
import ContactForm from "./components/Contact"

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/calendar" element={<Calendarsheet />} />
                    <Route path="/contact" element={<ContactForm />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;