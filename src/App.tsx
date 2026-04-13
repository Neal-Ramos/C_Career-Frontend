import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ApplyJob from './pages/ApplyJob'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import AdminJobs from './pages/AdminJobs'
import AdminApplications from './pages/AdminApplications'
import ProtectedRoutes from './components/auth/ProtectedRoutes'
import AdminViewJob from './pages/AdminViewJob'
import AdminViewApplication from './pages/AdminViewApplication'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/apply/:jobGuid' element={<ApplyJob/>}/>
        <Route path='/login' element={<AdminLogin/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='admin' element={<Admin/>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path='dashboard' element={<AdminDashboard/>}/>
            <Route path='jobs' element={<AdminJobs/>}>
              <Route path=':jobId' element={<AdminViewJob/>}/>
            </Route>
            <Route path='applications' element={<AdminApplications/>}>
              <Route path=':applicationId' element={<AdminViewApplication/>}/>
            </Route>
            <Route path='settings' element={<>NAH</>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App