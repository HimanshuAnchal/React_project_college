import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentList from './components/student_list';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './components/contact';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/student' element=
          {
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          } />
      </Route>
    </Routes>
  )
}

export default App;
