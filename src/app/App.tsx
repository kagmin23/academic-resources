import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from '../pages/CoursePage';
import ReportPage from '../pages/ReportPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoursePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
