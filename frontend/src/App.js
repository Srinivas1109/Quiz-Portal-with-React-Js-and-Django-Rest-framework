import './styles/App.css';
import Home from './Pages/Home';
import Question from './Quiz/Question';
import Quiz from './Quiz/Quiz';
import "./styles/quiz.css"
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import NavBar from './Components/NavBar';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import PrivateRoute from './Private/PrivateRoute';
import { AuthProvider } from './Context/AuthContext';
import UserProfile from './Pages/UserProfile';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Staff from './Create/Staff';
import StaffPrivateRoute from './Private/StaffPrivateRoute';
import CreateQuiz from './Create/CreateQuiz';
import EditQuiz from './Edit/EditQuiz';



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
