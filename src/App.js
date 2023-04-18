import "./App.scss";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Calendarsheet from "./components/Calendar"

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/calendar" element={<Calendarsheet />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;