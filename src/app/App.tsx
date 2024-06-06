import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportPage from '../pages/ReportPage';
import CoursePage from 'pages/CousrsePage';
import BlogPage from 'pages/BlogPage';
import DetailBlogPage from 'pages/DetailBlogPage';
import SavePage from 'pages/SavePage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/course" element={<CoursePage/>} />
        <Route path="/report" element={<ReportPage />} />
        <Route path='/blog' element={<BlogPage/>} />
        <Route path='/detailBlog' element={<DetailBlogPage/>} />
        <Route path='/save' element={<SavePage />} />
      </Routes>
    </Router>
  );
}

export default App;
