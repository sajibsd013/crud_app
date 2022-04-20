import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEvent from './Components/CreateEvent';
import Events from './Components/Events';

const App = () => {
  return (
    <div className="App container">
      <Routes>
        <Route path="/" element={<Navigate to="/events/1" />} />
        <Route path="/events" element={<Navigate to="/events/1" />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/events/:page/" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
