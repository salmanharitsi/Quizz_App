import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './routes/PrivateRoute'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Category from './pages/Category'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/play/:number' element={<Quiz />} />
          <Route path='/play' element={<Category />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
