
import UserRegister from "./Component/UserRegister";
import UserLogin from "./Component/UserLogin";
import {BrowserRouter as
      Router,
  Routes,
  Route} from 'react-router-dom';
export default function App() {
  return (
      <div className="App">
        <Router>
              <Routes>
                <Route exact path="/" element={<UserRegister/>}></Route>
                <Route exact path="/login" element={<UserLogin/>}></Route>
              </Routes>
        </Router>
      </div>
  )
}
