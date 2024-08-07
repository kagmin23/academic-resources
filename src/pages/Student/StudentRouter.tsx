import LayoutStudent from 'components/layout/LayoutStudent';
import {
  About,
  Contact,
  CourseDetailsPage,
  CoursePage,
  HomePage,
  SearchPage,
  Setting,
  ShoppingCart,
} from 'pages';
import Checkout from 'pages/Checkout';
import InstructorDetail from 'pages/InstructorDetail';
import PaymentSuccess from 'pages/PaymentSuccess';
import LessonStudent from 'pages/Student/StudentLearning';
import StudentPage from 'pages/Student/StudentPage';
import { Route, Routes } from 'react-router-dom';
import ProtectedRouter from '../../components/roles/ProtectedRouter';
import ManagerStudentPurchase from './OrdersStudent';

export default function StudentRouter() {

  return (
    <div >
               <Routes>
                    <Route path={`/`} element={<LayoutStudent />}>
                    <Route path={`/`} element={<HomePage />} />
                    <Route path={`about`} element={<About />} />
                    <Route path={`search`} element={<SearchPage />} />
                    <Route path={`search/course-details/:courseId/`}element={<ProtectedRouter allowedRoles={["student"]}><CourseDetailsPage /></ProtectedRouter>} />
                    <Route path={`course`}element={<ProtectedRouter allowedRoles={["student"]}><CoursePage /></ProtectedRouter>} />
                    <Route path={`course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["student"]}><CourseDetailsPage /></ProtectedRouter>} />
                    <Route path={`course/course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["student"]}><CourseDetailsPage /></ProtectedRouter>} />
                    <Route path={`shopping-cart/*`} element={<ProtectedRouter allowedRoles={["student"]}><ShoppingCart /></ProtectedRouter>} />
                    <Route path={`profile-student/*`} element={<ProtectedRouter allowedRoles={["student"]}><StudentPage /></ProtectedRouter>} />
                    <Route path={`contact`} element={<ProtectedRouter allowedRoles={["student"]}><Contact /></ProtectedRouter>} />
                    <Route path={`setting`} element={<ProtectedRouter allowedRoles={["student"]}><Setting /></ProtectedRouter>} />
                    <Route path={`student-learning/:courseId/lesson/`} element={<ProtectedRouter allowedRoles={["student"]}><LessonStudent /></ProtectedRouter>} />
                    <Route path={`shopping-cart/check-out/payment-successfully`} element={<ProtectedRouter allowedRoles={["student"]}><PaymentSuccess /></ProtectedRouter>} />
                    <Route path={`check-out`} element={<ProtectedRouter allowedRoles={["student"]}><Checkout /></ProtectedRouter>} />
                    <Route path={`manager-your-purchases`} element={<ProtectedRouter allowedRoles={["student"]}><ManagerStudentPurchase /></ProtectedRouter>} />
                    <Route path={`shopping-cart/check-out/payment-successfully/manager-your-purchases`} element={<ProtectedRouter allowedRoles={["student"]}><ManagerStudentPurchase /></ProtectedRouter>} />
                    <Route path={`shopping-cart/check-out`} element={<ProtectedRouter allowedRoles={["student"]}><Checkout /></ProtectedRouter>} />
                    <Route path={`course-details/:courseId/instructor-detail/:userId`} element={<ProtectedRouter allowedRoles={["student"]}><InstructorDetail /></ProtectedRouter>} />
                    </Route>
               </Routes>


    </div>
  )
}
