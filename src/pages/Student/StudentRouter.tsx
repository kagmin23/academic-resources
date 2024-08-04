import LayoutStudent from 'components/layout/LayoutStudent';
import {
  About,
  AddBlog,
  BlogPage,
  BuyNow,
  CategoryPage,
  Contact,
  CourseDetailsPage,
  CoursePage,
  HomePage,
  SearchPage,
  Setting,
  ShoppingCart,
  TopInstructorPage
} from 'pages';
import Checkout from 'pages/Checkout';
import InstructorDetail from 'pages/InstructorDetail';
import PaymentSuccess from 'pages/PaymentSuccess';
import LessonStudent from 'pages/Student/LessonStudent';
import StudentPage from 'pages/Student/StudentPage';
import { Route, Routes } from 'react-router-dom';
import ProtectedRouter from '../../components/roles/ProtectedRouter';
import Report from '../ReportPage';
import Certificate from './Certificate';
import ManagerStudentPurchase from './PurchasesStudent';
import StartLearning from './StartLearning';

export default function StudentRouter() {

  // const LayoutStudent = React.lazy(() => import("../../components/layout/LayoutStudent"));
  // const HomePage = React.lazy(() => import("../HomePage"));
  // const BlogPage = React.lazy(() => import("../BlogPage"));
  // const About = React.lazy(() => import("../About"));
  // const CoursePage = React.lazy(() => import("../CoursePage"));
  // const CourseDetailsPage = React.lazy(() => import("../CourseDetailsPage"));
  // const ShoppingCart = React.lazy(() => import("../ShoppingCart"));
  // const StudentPage = React.lazy(() => import("../Student/StudentPage"));
  // const BuyNow = React.lazy(() => import("../BuyNow"));
  // const Contact = React.lazy(() => import("../Contact"));
  // const Report = React.lazy(() => import("../ReportPage"));
  // const Setting = React.lazy(() => import("../Setting"));
  // const AddBlog = React.lazy(() => import("../AddBlog"));
  // const LessonStudent = React.lazy(() => import("../LessonStudent"));
  // const RouterLesson = React.lazy(() => import("../Student/RouterLesson"));
  // const SavePage = React.lazy(() => import("../SavePage"));
  // const PaymentSuccess = React.lazy(() => import("../PaymentSuccess"));
  // const TopInstructorPage = React.lazy(() => import("../TopInstructorPage"));
  // const Certificate = React.lazy(() => import("../Student/Certificate"));

  return (
    <div >
               <Routes>
                    <Route path={`/`} element={<LayoutStudent />}>
                    <Route path={`/`} element={<HomePage />} />
                    <Route path={`blog`} element={<BlogPage />} />
                    <Route path={`about`} element={<About />} />
                    <Route path={`search`} element={<SearchPage />} />
                    <Route path={`course`}element={<ProtectedRouter allowedRoles={["student"]}><CoursePage /></ProtectedRouter>} />
                    <Route path={`category`} element={<ProtectedRouter allowedRoles={["student"]}><CategoryPage /></ProtectedRouter>} />
                    <Route path={`course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["student"]}><CourseDetailsPage /></ProtectedRouter>} />
                    <Route path={`course/course-details/:courseId/`} element={<ProtectedRouter allowedRoles={["student"]}><CourseDetailsPage /></ProtectedRouter>} />
                    <Route path={`shopping-cart/*`} element={<ProtectedRouter allowedRoles={["student"]}><ShoppingCart /></ProtectedRouter>} />
                    <Route path={`profile-student/*`} element={<ProtectedRouter allowedRoles={["student"]}><StudentPage /></ProtectedRouter>} />
                    <Route path={`buy-now`} element={<ProtectedRouter allowedRoles={["student"]}><BuyNow /></ProtectedRouter>} />
                    <Route path={`contact`} element={<ProtectedRouter allowedRoles={["student"]}><Contact /></ProtectedRouter>} />
                    <Route path={`report`} element={<ProtectedRouter allowedRoles={["student"]}><Report /></ProtectedRouter>} />
                    <Route path={`setting`} element={<ProtectedRouter allowedRoles={["student"]}><Setting /></ProtectedRouter>} />
                    <Route path={`add-blog`} element={<ProtectedRouter allowedRoles={["student"]}><AddBlog /></ProtectedRouter>} />
                    <Route path={`student-learning/:courseId/lesson`} element={<ProtectedRouter allowedRoles={["student"]}><LessonStudent /></ProtectedRouter>} />
                    <Route path={`student-learning/:courseId/lesson/:lessonId/`} element={<ProtectedRouter allowedRoles={["student"]}><StartLearning /></ProtectedRouter>} />
                    <Route path={`payment-successfully`} element={<ProtectedRouter allowedRoles={["student"]}><PaymentSuccess /></ProtectedRouter>} />
                    <Route path={`top-instructor`} element={<ProtectedRouter allowedRoles={["student"]}><TopInstructorPage /></ProtectedRouter>} />
                    <Route path={`certificate-student`} element={<ProtectedRouter allowedRoles={["student"]}><Certificate /></ProtectedRouter>} />
                    <Route path={`/check-out`} element={<ProtectedRouter allowedRoles={["student"]}><Checkout /></ProtectedRouter>} />
                    <Route path={`manager-student-purchase`} element={<ProtectedRouter allowedRoles={["student"]}><ManagerStudentPurchase /></ProtectedRouter>} />
                    <Route path={`shopping-cart/check-out`} element={<ProtectedRouter allowedRoles={["student"]}><Checkout /></ProtectedRouter>} />
                    <Route path={`course-details/:courseId/instructor-detail/:userId`} element={<ProtectedRouter allowedRoles={["student"]}><InstructorDetail /></ProtectedRouter>} />

                    </Route>
               </Routes>


    </div>
  )
}
