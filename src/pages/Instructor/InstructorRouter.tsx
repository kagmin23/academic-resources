import {
  About,
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
import { Route, Routes } from 'react-router-dom';
import LayoutInstructor from '../../components/layout/LayoutInstructor';
import ProtectedRouter from '../../components/roles/ProtectedRouter';
import Report from '../ReportPage';
import InstructorPage from './InstructorPage';
import RouterLesson from 'pages/Student/RouterLesson';
export default function InstructorRouter() {
  return (
    <div >
    
    <Routes>
         <Route path={`/`} element={<LayoutInstructor />}>
         <Route path={`/`} element={<HomePage />} />
         <Route path={`blog`} element={<BlogPage />} />
         <Route path={`about`} element={<About />} />
         <Route path={`course/*`}element={<ProtectedRouter allowedRoles={[3]}><CoursePage /></ProtectedRouter>} />
         <Route path={`course/category`} element={<ProtectedRouter allowedRoles={[3]}><CategoryPage /></ProtectedRouter>} />
         <Route path={`category`} element={<ProtectedRouter allowedRoles={[3]}><CategoryPage /></ProtectedRouter>} />
         <Route path={`course-details`} element={<ProtectedRouter allowedRoles={[3]}><CourseDetailsPage /></ProtectedRouter>} />
         <Route path={`shopping-cart`} element={<ProtectedRouter allowedRoles={[3]}><ShoppingCart /></ProtectedRouter>} />
         <Route path={`profile-instructor/*`} element={<ProtectedRouter allowedRoles={[3]}><InstructorPage /></ProtectedRouter>} />
         <Route path={`buy-now`} element={<ProtectedRouter allowedRoles={[3]}><BuyNow /></ProtectedRouter>} />
         <Route path={`contact`} element={<ProtectedRouter allowedRoles={[3]}><Contact /></ProtectedRouter>} />
         <Route path={`report`} element={<ProtectedRouter allowedRoles={[3]}><Report /></ProtectedRouter>} />
         <Route path={`setting`} element={<ProtectedRouter allowedRoles={[3]}><Setting /></ProtectedRouter>} />
         <Route path={`lesson-student`} element={<ProtectedRouter allowedRoles={[3]}><LessonStudent /></ProtectedRouter>} />
         {/* <Route path={`lesson-student/:id`} element={<ProtectedRouter allowedRoles={[3]}><LessonStudent /></ProtectedRouter>} /> */}
         <Route path={`router-lesson/*`} element={<ProtectedRouter allowedRoles={[3]}><RouterLesson /></ProtectedRouter>} />
         <Route path={`save`} element={<ProtectedRouter allowedRoles={[3]}><SavePage /></ProtectedRouter>} />
         <Route path={`payment-successfully`} element={<ProtectedRouter allowedRoles={[3]}><PaymentSuccess /></ProtectedRouter>} />
         <Route path={`top-instructor`} element={<ProtectedRouter allowedRoles={[3]}><TopInstructorPage /></ProtectedRouter>} />

         </Route>
    </Routes>


</div>
  )
}
