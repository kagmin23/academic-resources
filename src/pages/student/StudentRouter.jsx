import LayoutStudent from 'components/layout/LayoutStudent';
import ProtectedRouter from 'components/roles/ProtectedRouter';
import {
  About,
  BlogPage,
  BuyNow,
  CategoryPage,
  Contact,
  CoursePage,
  HomePage,
  LessonStudent,
  ProfileStudent,
  SavePage,
  Setting,
  ShoppingCart,
} from 'pages';
import PaymentSuccess from 'pages/PaymentSuccess';
import Report from 'pages/ReportPage';
import { Route, Routes } from 'react-router-dom';

export default function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutStudent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="about" element={<About />} />
          <Route path="course" element={<ProtectedRouter allowedRoles={[2]}><CoursePage /></ProtectedRouter>} />
          <Route path="category" element={<ProtectedRouter allowedRoles={[2]}><CategoryPage /></ProtectedRouter>} />
          <Route path="shopping-cart" element={<ProtectedRouter allowedRoles={[2]}><ShoppingCart /></ProtectedRouter>} />
          <Route path="profile-student" element={<ProtectedRouter allowedRoles={[2]}><ProfileStudent /></ProtectedRouter>} />
          <Route path="buy-now" element={<ProtectedRouter allowedRoles={[2]}><BuyNow /></ProtectedRouter>} />
          <Route path="contact" element={<ProtectedRouter allowedRoles={[2]}><Contact /></ProtectedRouter>} />
          <Route path="report" element={<ProtectedRouter allowedRoles={[2]}><Report /></ProtectedRouter>} />
          <Route path="setting" element={<ProtectedRouter allowedRoles={[2]}><Setting /></ProtectedRouter>} />
          <Route path="lesson-student" element={<ProtectedRouter allowedRoles={[2]}><LessonStudent /></ProtectedRouter>} />
          <Route path="save" element={<ProtectedRouter allowedRoles={[2]}><SavePage /></ProtectedRouter>} />
          <Route path="payment-successfully" element={<ProtectedRouter allowedRoles={[2]}><PaymentSuccess /></ProtectedRouter>} />
        </Route>
      </Routes>
    </div>
  );
}
