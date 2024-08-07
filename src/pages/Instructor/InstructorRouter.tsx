import {
  About,
  Contact,
  CourseDetailsPage,
  CoursePage,
  HomePage,
  LessonStudent,
  SearchPage,
  Setting,
  ShoppingCart,
} from 'pages';
import MyCourseInstructor from 'pages/Instructor/MyCourseInstructor';
import InstructorDetail from 'pages/InstructorDetail';
import PaymentSuccess from 'pages/PaymentSuccess';
import { Route, Routes } from 'react-router-dom';
import LayoutInstructor from '../../components/layout/LayoutInstructor';
import ProtectedRouter from '../../components/roles/ProtectedRouter';
import InstructorLearning from './InstructorLearning';
import InstructorPage from './InstructorPage';

import Checkout from 'pages/Checkout';
import OrdersInstructor from './OrdersInstructor';
export default function InstructorRouter() {

  return (
    <div >
    
    <Routes>
         <Route path={`/`} element={<LayoutInstructor />}>
         <Route path={`/`} element={<HomePage />} />
         <Route path={`about`} element={<About />} />
         <Route path={`search`} element={<SearchPage />} />
         <Route path={`search/course-details/:courseId/`}element={<ProtectedRouter allowedRoles={["instructor"]}><CourseDetailsPage /></ProtectedRouter>} />
         <Route path={`course/*`}element={<ProtectedRouter allowedRoles={["instructor"]}><CoursePage /></ProtectedRouter>} />
         <Route path={`course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["instructor"]}><CourseDetailsPage /></ProtectedRouter>} />
         <Route path={`course/course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["instructor"]}><CourseDetailsPage /></ProtectedRouter>} />
         <Route path={`shopping-cart`} element={<ProtectedRouter allowedRoles={["instructor"]}><ShoppingCart /></ProtectedRouter>} />
         <Route path={`profile-instructor/*`} element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorPage /></ProtectedRouter>} />
         <Route path={`contact`} element={<ProtectedRouter allowedRoles={["instructor"]}><Contact /></ProtectedRouter>} />
         <Route path={`setting`} element={<ProtectedRouter allowedRoles={["instructor"]}><Setting /></ProtectedRouter>} />
         <Route path={`lesson-student`} element={<ProtectedRouter allowedRoles={["instructor"]}><LessonStudent /></ProtectedRouter>} />
         <Route path={`shopping-cart/check-out/payment-successfully`} element={<ProtectedRouter allowedRoles={["instructor"]}><PaymentSuccess /></ProtectedRouter>} />
         {/* <Route path={`view-session`} element={<ProtectedRouter allowedRoles={["instructor"]}><ViewSession /></ProtectedRouter>} /> */}
         <Route path={`shopping-cart/check-out`} element={<ProtectedRouter allowedRoles={["instructor"]}><Checkout /></ProtectedRouter>} />
         <Route path={`course-details/:courseId/instructor-detail/:userId`} element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorDetail /></ProtectedRouter>} />
         <Route path={`your-courses`} element={<ProtectedRouter allowedRoles={["instructor"]}><MyCourseInstructor /></ProtectedRouter>} />
         <Route path={`manager-your-purchases`} element={<ProtectedRouter allowedRoles={["instructor"]}><OrdersInstructor /></ProtectedRouter>} />
         <Route path={`/shopping-cart/check-out/payment-successfully/manager-your-purchases`} element={<ProtectedRouter allowedRoles={["instructor"]}><OrdersInstructor /></ProtectedRouter>} />
         <Route path={`/student-learning/:courseId/lesson`} element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorLearning /></ProtectedRouter>} />
         <Route path={`/instructor/student-learning/:courseId/lesson`} element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorLearning /></ProtectedRouter>} />
         </Route>
    </Routes>
</div>
  )
}
