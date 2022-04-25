import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateEdit from './Components/Action/CreateEdit';
import Events from './Components/Events/Events';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/events/1" />} />
        <Route path="/events" element={<Navigate to="/events/1" />} />
        <Route path="/events/:page/" element={<Events />} />
        <Route path="/events/create" element={<CreateEdit />} />
        <Route path="/events/edit/:id" element={<CreateEdit />} />
      </Routes>
    </div>
  );
}

export default App;
