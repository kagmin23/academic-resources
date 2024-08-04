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
import InstructorDetail from 'pages/InstructorDetail';
import PaymentSuccess from 'pages/PaymentSuccess';
import MyCourseStudent from 'pages/Student/MyCourseStudent';
import { Route, Routes } from 'react-router-dom';
import LayoutInstructor from '../../components/layout/LayoutInstructor';
import ProtectedRouter from '../../components/roles/ProtectedRouter';
import InstructorPage from './InstructorPage';

import Checkout from 'pages/Checkout';
export default function InstructorRouter() {

  return (
    <div >
    
    <Routes>
         <Route path={`/`} element={<LayoutInstructor />}>
         <Route path={`/`} element={<HomePage />} />
         <Route path={`about`} element={<About />} />
         <Route path={`search`} element={<SearchPage />} />
         <Route path={`course/*`}element={<ProtectedRouter allowedRoles={["instructor"]}><CoursePage /></ProtectedRouter>} />
         <Route path={`course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["instructor"]}><CourseDetailsPage /></ProtectedRouter>} />
         <Route path={`course/course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["instructor"]}><CourseDetailsPage /></ProtectedRouter>} />
         <Route path={`shopping-cart`} element={<ProtectedRouter allowedRoles={["instructor"]}><ShoppingCart /></ProtectedRouter>} />
         <Route path={`profile-instructor/*`} element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorPage /></ProtectedRouter>} />
         <Route path={`contact`} element={<ProtectedRouter allowedRoles={["instructor"]}><Contact /></ProtectedRouter>} />
         <Route path={`setting`} element={<ProtectedRouter allowedRoles={["instructor"]}><Setting /></ProtectedRouter>} />
         <Route path={`lesson-student`} element={<ProtectedRouter allowedRoles={["instructor"]}><LessonStudent /></ProtectedRouter>} />
         {/* <Route path={`lesson-student/:id`} element={<ProtectedRouter allowedRoles={["instructor"]}><LessonStudent /></ProtectedRouter>} /> */}
         <Route path={`student-learning`} element={<ProtectedRouter allowedRoles={["instructor"]}><MyCourseStudent /></ProtectedRouter>} />
         <Route path={`payment-successfully`} element={<ProtectedRouter allowedRoles={["instructor"]}><PaymentSuccess /></ProtectedRouter>} />
         {/* <Route path={`view-session`} element={<ProtectedRouter allowedRoles={["instructor"]}><ViewSession /></ProtectedRouter>} /> */}
         <Route path={`check-out`} element={<ProtectedRouter allowedRoles={["instructor"]}><Checkout /></ProtectedRouter>} />
         <Route path={`course-details/:courseId/instructor-detail/:userId`} element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorDetail /></ProtectedRouter>} />

         </Route>
    </Routes>
   


</div>
  )
}
