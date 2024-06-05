import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportPage from '../pages/ReportPage';
import CoursePage from 'pages/CousrsePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoursePage/>} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
