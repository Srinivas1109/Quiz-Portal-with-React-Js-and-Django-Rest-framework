import './styles/App.css';
import Home from './Components/Home';
import Question from './Components/Question';
import Quiz from './Components/Quiz';
import "./styles/quiz.css"
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import PrivateRoute from './Components/PrivateRoute';
import { AuthProvider } from './Context/AuthContext';
import UserProfile from './Components/UserProfile';
import Contact from './Components/Contact';
import About from './Components/About';
import Staff from './Components/Staff';
import StaffPrivateRoute from './Components/StaffPrivateRoute';
import CreateQuiz from './Components/CreateQuiz';
import EditQuiz from './Components/EditQuiz';



// const auth = null
function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        {/* <PrivateRoute path='/sign-up' element={<SignUp />} /> */}

        <Routes>

          <Route element={<PrivateRoute />}>
            <Route path='/quizzes' element={<Quiz />} />
            <Route path="/quizzes/:id/questions" element={<Question />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          <Route element={<StaffPrivateRoute />}>
            <Route path='/staff' element={<Staff />} />
            <Route path='/create' element={<CreateQuiz />} />
            <Route path="/quizzes/:id/edit" element={<EditQuiz />} />
          </Route>

          <Route path='/login' element={<Login />} />

          <Route exact path="/" element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />

        </Routes>

      </AuthProvider>
    </Router>
  )
}

export default App;
