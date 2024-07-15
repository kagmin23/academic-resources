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
  LessonStudent,
  SavePage,
  Setting,
  ShoppingCart,
  TopInstructorPage
} from 'pages';
import PaymentSuccess from 'pages/PaymentSuccess';
import RouterLesson from 'pages/Student/RouterLesson';
import { Route, Routes } from 'react-router-dom';
import LayoutInstructor from '../../components/layout/LayoutInstructor';
import ProtectedRouter from '../../components/roles/ProtectedRouter';
import Report from '../ReportPage';
import InstructorPage from './InstructorPage';
import ViewSession from './ViewSession';
export default function InstructorRouter() {

  // const LayoutInstructor = React.lazy(() => import("../../components/layout/LayoutInstructor"));
  // const HomePage = React.lazy(() => import("../HomePage"));
  // const BlogPage = React.lazy(() => import("../BlogPage"));
  // const About = React.lazy(() => import("../About"));
  // const CoursePage = React.lazy(() => import("../CoursePage"));
  // const CourseDetailsPage = React.lazy(() => import("../CourseDetailsPage"));
  // const ShoppingCart = React.lazy(() => import("../ShoppingCart"));
  // const InstructorPage = React.lazy(() => import("../Instructor/InstructorPage"));
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
  // const ViewSession = React.lazy(() => import("../Instructor/ViewSession"));

  return (
    <div >
    
    <Routes>
         <Route path={`/`} element={<LayoutInstructor />}>
         <Route path={`/`} element={<HomePage />} />
         <Route path={`blog`} element={<BlogPage />} />
         <Route path={`about`} element={<About />} />
         <Route path={`course/*`}element={<ProtectedRouter allowedRoles={["instructor"]}><CoursePage /></ProtectedRouter>} />
         <Route path={`course/category`} element={<ProtectedRouter allowedRoles={["instructor"]}><CategoryPage /></ProtectedRouter>} />
         <Route path={`category`} element={<ProtectedRouter allowedRoles={["instructor"]}><CategoryPage /></ProtectedRouter>} />
         <Route path={`course-details`} element={<ProtectedRouter allowedRoles={["instructor"]}><CourseDetailsPage /></ProtectedRouter>} />
         <Route path={`shopping-cart`} element={<ProtectedRouter allowedRoles={["instructor"]}><ShoppingCart /></ProtectedRouter>} />
         <Route path={`profile-instructor/*`} element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorPage /></ProtectedRouter>} />
         <Route path={`buy-now`} element={<ProtectedRouter allowedRoles={["instructor"]}><BuyNow /></ProtectedRouter>} />
         <Route path={`contact`} element={<ProtectedRouter allowedRoles={["instructor"]}><Contact /></ProtectedRouter>} />
         <Route path={`report`} element={<ProtectedRouter allowedRoles={["instructor"]}><Report /></ProtectedRouter>} />
         <Route path={`setting`} element={<ProtectedRouter allowedRoles={["instructor"]}><Setting /></ProtectedRouter>} />
         <Route path={`add-blog`} element={<ProtectedRouter allowedRoles={["instructor"]}><AddBlog /></ProtectedRouter>} />
         <Route path={`lesson-student`} element={<ProtectedRouter allowedRoles={["instructor"]}><LessonStudent /></ProtectedRouter>} />
         {/* <Route path={`lesson-student/:id`} element={<ProtectedRouter allowedRoles={["instructor"]}><LessonStudent /></ProtectedRouter>} /> */}
         <Route path={`router-lesson/*`} element={<ProtectedRouter allowedRoles={["instructor"]}><RouterLesson /></ProtectedRouter>} />
         <Route path={`save`} element={<ProtectedRouter allowedRoles={["instructor"]}><SavePage /></ProtectedRouter>} />
         <Route path={`payment-successfully`} element={<ProtectedRouter allowedRoles={["instructor"]}><PaymentSuccess /></ProtectedRouter>} />
         <Route path={`top-instructor`} element={<ProtectedRouter allowedRoles={["instructor"]}><TopInstructorPage /></ProtectedRouter>} />
         {/* <Route path={`view-session`} element={<ProtectedRouter allowedRoles={["instructor"]}><ViewSession /></ProtectedRouter>} /> */}

         </Route>
    </Routes>


</div>
  )
}
