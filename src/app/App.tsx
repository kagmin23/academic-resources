import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportPage from '../pages/ReportPage';
import CoursePage from 'pages/CousrsePage';
import BlogPage from 'pages/BlogPage';
import DetailBlogPage from 'pages/DetailBlogPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoursePage/>} />
        <Route path="/report" element={<ReportPage />} />
        <Route path='/blog' element={<BlogPage/>} />
        <Route path='/detailBlog' element={<DetailBlogPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
