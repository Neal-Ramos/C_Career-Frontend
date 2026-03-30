import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ApplyJob from './pages/ApplyJob'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import AdminJobs from './pages/AdminJobs'
import AdminApplications from './pages/AdminApplications'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/apply/:jobGuid' element={<ApplyJob/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/admin' element={<Admin/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='jobs' element={<AdminJobs/>}/>
          <Route path='applications' element={<AdminApplications/>}/>
          <Route path='settings' element={<>NAH</>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App