import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from './components/join/Join';
import Chat from './components/chat/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
